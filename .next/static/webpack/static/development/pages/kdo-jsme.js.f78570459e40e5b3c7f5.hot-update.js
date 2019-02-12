webpackHotUpdate("static/development/pages/kdo-jsme.js",{

/***/ "./node_modules/@sanity/block-content-to-hyperscript/internals.js":
/*!************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-hyperscript/internals.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/internals */ "./node_modules/@sanity/block-content-to-hyperscript/lib/internals.js")


/***/ }),

/***/ "./node_modules/@sanity/block-content-to-hyperscript/lib/blocksToNodes.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-hyperscript/lib/blocksToNodes.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");
var buildMarksTree = __webpack_require__(/*! ./buildMarksTree */ "./node_modules/@sanity/block-content-to-hyperscript/lib/buildMarksTree.js");
var nestLists = __webpack_require__(/*! ./nestLists */ "./node_modules/@sanity/block-content-to-hyperscript/lib/nestLists.js");
var generateKeys = __webpack_require__(/*! ./generateKeys */ "./node_modules/@sanity/block-content-to-hyperscript/lib/generateKeys.js");
var mergeSerializers = __webpack_require__(/*! ./mergeSerializers */ "./node_modules/@sanity/block-content-to-hyperscript/lib/mergeSerializers.js");

// Properties to extract from props and pass to serializers as options
var optionProps = ['projectId', 'dataset', 'imageOptions'];
var isDefined = function isDefined(val) {
  return typeof val !== 'undefined';
};
var defaults = { imageOptions: {} };

function blocksToNodes(h, properties, defaultSerializers, serializeSpan) {
  var props = objectAssign({}, defaults, properties);
  var rawBlocks = Array.isArray(props.blocks) ? props.blocks : [props.blocks];
  var keyedBlocks = generateKeys(rawBlocks);
  var blocks = nestLists(keyedBlocks, props.listNestMode);
  var serializers = mergeSerializers(defaultSerializers, props.serializers || {});

  var options = optionProps.reduce(function (opts, key) {
    var value = props[key];
    if (isDefined(value)) {
      opts[key] = value;
    }
    return opts;
  }, {});

  function serializeNode(node, index, siblings, isInline) {
    if (isList(node)) {
      return serializeList(node);
    }

    if (isListItem(node)) {
      return serializeListItem(node, findListItemIndex(node, siblings));
    }

    if (isSpan(node)) {
      return serializeSpan(node, serializers, index, { serializeNode: serializeNode });
    }

    return serializeBlock(node, index, isInline);
  }

  function findListItemIndex(node, siblings) {
    var index = 0;
    for (var i = 0; i < siblings.length; i++) {
      if (siblings[i] === node) {
        return index;
      }

      if (!isListItem(siblings[i])) {
        continue;
      }

      index++;
    }

    return index;
  }

  function serializeBlock(block, index, isInline) {
    var tree = buildMarksTree(block);
    var children = tree.map(function (node, i, siblings) {
      return serializeNode(node, i, siblings, true);
    });
    var blockProps = {
      key: block._key || 'block-' + index,
      node: block,
      isInline: isInline,
      serializers: serializers,
      options: options
    };

    return h(serializers.block, blockProps, children);
  }

  function serializeListItem(block, index) {
    var key = block._key;
    var tree = buildMarksTree(block);
    var children = tree.map(serializeNode);
    return h(serializers.listItem, { node: block, serializers: serializers, index: index, key: key, options: options }, children);
  }

  function serializeList(list) {
    var type = list.listItem;
    var level = list.level;
    var key = list._key;
    var children = list.children.map(serializeNode);
    return h(serializers.list, { key: key, level: level, type: type, options: options }, children);
  }

  // Default to false, so `undefined` will evaluate to the default here
  var renderContainerOnSingleChild = Boolean(props.renderContainerOnSingleChild);

  var nodes = blocks.map(serializeNode);
  if (renderContainerOnSingleChild || nodes.length > 1) {
    var containerProps = props.className ? { className: props.className } : {};
    return h(serializers.container, containerProps, nodes);
  }

  if (nodes[0]) {
    return nodes[0];
  }

  return typeof serializers.empty === 'function' ? h(serializers.empty) : serializers.empty;
}

function isList(block) {
  return block._type === 'list' && block.listItem;
}

function isListItem(block) {
  return block._type === 'block' && block.listItem;
}

function isSpan(block) {
  return typeof block === 'string' || block.marks || block._type === 'span';
}

module.exports = blocksToNodes;
//# sourceMappingURL=blocksToNodes.js.map

/***/ }),

/***/ "./node_modules/@sanity/block-content-to-hyperscript/lib/buildMarksTree.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-hyperscript/lib/buildMarksTree.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaultMarks = ['strong', 'em', 'code', 'underline', 'strike-through'];

var buildMarksTree = function buildMarksTree(block) {
  var children = block.children,
      markDefs = block.markDefs;

  if (!children || !children.length) {
    return [];
  }

  var sortedMarks = children.map(sortMarksByOccurences);
  var rootNode = { _type: 'span', children: [] };
  var nodeStack = [rootNode];

  children.forEach(function (span, i) {
    var marksNeeded = sortedMarks[i];
    if (!marksNeeded) {
      var lastNode = nodeStack[nodeStack.length - 1];
      lastNode.children.push(span);
      return;
    }

    var pos = 1;

    // Start at position one. Root is always plain and should never be removed. (?)
    if (nodeStack.length > 1) {
      for (pos; pos < nodeStack.length; pos++) {
        var mark = nodeStack[pos].markKey;
        var index = marksNeeded.indexOf(mark);
        // eslint-disable-next-line max-depth
        if (index === -1) {
          break;
        }

        marksNeeded.splice(index, 1);
      }
    }

    // Keep from beginning to first miss
    nodeStack = nodeStack.slice(0, pos);

    // Add needed nodes
    var currentNode = findLastParentNode(nodeStack);
    marksNeeded.forEach(function (mark) {
      var node = {
        _type: 'span',
        _key: span._key,
        children: [],
        mark: markDefs.find(function (def) {
          return def._key === mark;
        }) || mark,
        markKey: mark
      };

      currentNode.children.push(node);
      nodeStack.push(node);
      currentNode = node;
    });

    // Split at newlines to make individual line chunks, but keep newline
    // characters as individual elements in the array. We use these characters
    // in the span serializer to trigger hard-break rendering
    if (isTextSpan(span)) {
      var lines = span.text.split('\n');
      for (var line = lines.length; line-- > 1;) {
        lines.splice(line, 0, '\n');
      }

      currentNode.children = currentNode.children.concat(lines);
    } else {
      currentNode.children = currentNode.children.concat(span);
    }
  });

  return rootNode.children;
};

// We want to sort all the marks of all the spans in the following order:
// 1. Marks that are shared amongst the most adjacent siblings
// 2. Non-default marks (links, custom metadata)
// 3. Built-in, plain marks (bold, emphasis, code etc)
function sortMarksByOccurences(span, i, spans) {
  if (!span.marks || span.marks.length === 0) {
    return span.marks || [];
  }

  var markOccurences = span.marks.reduce(function (occurences, mark) {
    occurences[mark] = occurences[mark] ? occurences[mark] + 1 : 1;

    for (var siblingIndex = i + 1; siblingIndex < spans.length; siblingIndex++) {
      var sibling = spans[siblingIndex];

      if (sibling.marks && Array.isArray(sibling.marks) && sibling.marks.indexOf(mark) !== -1) {
        occurences[mark]++;
      } else {
        break;
      }
    }

    return occurences;
  }, {});

  var sortByOccurence = sortMarks.bind(null, markOccurences);

  // Slicing because sort() mutates the input
  return span.marks.slice().sort(sortByOccurence);
}

function sortMarks(occurences, markA, markB) {
  var aOccurences = occurences[markA] || 0;
  var bOccurences = occurences[markB] || 0;

  if (aOccurences !== bOccurences) {
    return bOccurences - aOccurences;
  }

  var aDefaultPos = defaultMarks.indexOf(markA);
  var bDefaultPos = defaultMarks.indexOf(markB);

  // Sort default marks last
  if (aDefaultPos !== bDefaultPos) {
    return aDefaultPos - bDefaultPos;
  }

  // Sort other marks simply by key
  if (markA < markB) {
    return -1;
  } else if (markA > markB) {
    return 1;
  }

  return 0;
}

function isTextSpan(node) {
  return node._type === 'span' && typeof node.text === 'string' && (Array.isArray(node.marks) || typeof node.marks === 'undefined');
}

function findLastParentNode(nodes) {
  for (var i = nodes.length - 1; i >= 0; i--) {
    var node = nodes[i];
    if (node._type === 'span' && node.children) {
      return node;
    }
  }

  return undefined;
}

module.exports = buildMarksTree;
//# sourceMappingURL=buildMarksTree.js.map

/***/ }),

/***/ "./node_modules/@sanity/block-content-to-hyperscript/lib/generateKeys.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-hyperscript/lib/generateKeys.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

module.exports = function (blocks) {
  return blocks.map(function (block) {
    if (block._key) {
      return block;
    }

    return objectAssign({ _key: getStaticKey(block) }, block);
  });
};

function getStaticKey(item) {
  return checksum(JSON.stringify(item)).toString(36).replace(/[^A-Za-z0-9]/g, '');
}

/* eslint-disable no-bitwise */
function checksum(str) {
  var hash = 0;
  var strlen = str.length;
  if (strlen === 0) {
    return hash;
  }

  for (var i = 0; i < strlen; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash &= hash; // Convert to 32bit integer
  }

  return hash;
}
/* eslint-enable no-bitwise */
//# sourceMappingURL=generateKeys.js.map

/***/ }),

/***/ "./node_modules/@sanity/block-content-to-hyperscript/lib/getImageUrl.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-hyperscript/lib/getImageUrl.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var generateHelpUrl = __webpack_require__(/*! @sanity/generate-help-url */ "./node_modules/@sanity/block-content-to-hyperscript/node_modules/@sanity/generate-help-url/index.js");
var urlBuilder = __webpack_require__(/*! @sanity/image-url */ "./node_modules/@sanity/image-url/index.js");
var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var enc = encodeURIComponent;
var materializeError = 'You must either:\n  - Pass `projectId` and `dataset` to the block renderer\n  - Materialize images to include the `url` field.\n\nFor more information, see ' + generateHelpUrl('block-content-image-materializing');

var getQueryString = function getQueryString(options) {
  var query = options.imageOptions;
  var keys = Object.keys(query);
  if (!keys.length) {
    return '';
  }

  var params = keys.map(function (key) {
    return enc(key) + '=' + enc(query[key]);
  });
  return '?' + params.join('&');
};

var buildUrl = function buildUrl(props) {
  var node = props.node,
      options = props.options;
  var projectId = options.projectId,
      dataset = options.dataset;

  var asset = node.asset;

  if (!asset) {
    throw new Error('Image does not have required `asset` property');
  }

  if (asset.url) {
    return asset.url + getQueryString(options);
  }

  if (!projectId || !dataset) {
    throw new Error(materializeError);
  }

  var ref = asset._ref;
  if (!ref) {
    throw new Error('Invalid image reference in block, no `_ref` found on `asset`');
  }

  return urlBuilder(objectAssign({ projectId: projectId, dataset: dataset }, options.imageOptions || {})).image(node).toString();
};

module.exports = buildUrl;
//# sourceMappingURL=getImageUrl.js.map

/***/ }),

/***/ "./node_modules/@sanity/block-content-to-hyperscript/lib/internals.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-hyperscript/lib/internals.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getSerializers = __webpack_require__(/*! ./serializers */ "./node_modules/@sanity/block-content-to-hyperscript/lib/serializers.js");
var _blocksToNodes = __webpack_require__(/*! ./blocksToNodes */ "./node_modules/@sanity/block-content-to-hyperscript/lib/blocksToNodes.js");
var getImageUrl = __webpack_require__(/*! ./getImageUrl */ "./node_modules/@sanity/block-content-to-hyperscript/lib/getImageUrl.js");
var mergeSerializers = __webpack_require__(/*! ./mergeSerializers */ "./node_modules/@sanity/block-content-to-hyperscript/lib/mergeSerializers.js");

module.exports = {
  blocksToNodes: function blocksToNodes(renderNode, props, defaultSerializers, serializeSpan) {
    if (defaultSerializers) {
      return _blocksToNodes(renderNode, props, defaultSerializers, serializeSpan);
    }

    // Backwards-compatibility
    var serializers = getSerializers(renderNode);
    return _blocksToNodes(renderNode, props, serializers.defaultSerializers, serializers.serializeSpan);
  },
  getSerializers: getSerializers,
  getImageUrl: getImageUrl,
  mergeSerializers: mergeSerializers
};
//# sourceMappingURL=internals.js.map

/***/ }),

/***/ "./node_modules/@sanity/block-content-to-hyperscript/lib/mergeSerializers.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-hyperscript/lib/mergeSerializers.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");
var isDefined = function isDefined(val) {
  return typeof val !== 'undefined';
};

// Recursively merge/replace default serializers with user-specified serializers
module.exports = function mergeSerializers(defaultSerializers, userSerializers) {
  return Object.keys(defaultSerializers).reduce(function (acc, key) {
    var type = _typeof(defaultSerializers[key]);
    if (type === 'function') {
      acc[key] = isDefined(userSerializers[key]) ? userSerializers[key] : defaultSerializers[key];
    } else if (type === 'object') {
      acc[key] = objectAssign({}, defaultSerializers[key], userSerializers[key]);
    } else {
      acc[key] = typeof userSerializers[key] === 'undefined' ? defaultSerializers[key] : userSerializers[key];
    }
    return acc;
  }, {});
};
//# sourceMappingURL=mergeSerializers.js.map

/***/ }),

/***/ "./node_modules/@sanity/block-content-to-hyperscript/lib/nestLists.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-hyperscript/lib/nestLists.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

/* eslint-disable max-depth, complexity */
function nestLists(blocks) {
  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'html';

  var tree = [];
  var currentList = void 0;

  for (var i = 0; i < blocks.length; i++) {
    var block = blocks[i];
    if (!isListBlock(block)) {
      tree.push(block);
      currentList = null;
      continue;
    }

    // Start of a new list?
    if (!currentList) {
      currentList = listFromBlock(block);
      tree.push(currentList);
      continue;
    }

    // New list item within same list?
    if (blockMatchesList(block, currentList)) {
      currentList.children.push(block);
      continue;
    }

    // Different list props, are we going deeper?
    if (block.level > currentList.level) {
      var newList = listFromBlock(block);

      if (mode === 'html') {
        // Because HTML is kinda weird, nested lists needs to be nested within list items
        // So while you would think that we could populate the parent list with a new sub-list,
        // We actually have to target the last list element (child) of the parent.
        // However, at this point we need to be very careful - simply pushing to the list of children
        // will mutate the input, and we don't want to blindly clone the entire tree.

        // Clone the last child while adding our new list as the last child of it
        var lastListItem = lastChild(currentList);
        var newLastChild = objectAssign({}, lastListItem, {
          children: lastListItem.children.concat(newList)
        });

        // Swap the last child
        currentList.children[currentList.children.length - 1] = newLastChild;
      } else {
        currentList.children.push(newList);
      }

      // Set the newly created, deeper list as the current
      currentList = newList;
      continue;
    }

    // Different list props, are we going back up the tree?
    if (block.level < currentList.level) {
      // Current list has ended, and we need to hook up with a parent of the same level and type
      var match = findListMatching(tree[tree.length - 1], block);
      if (match) {
        currentList = match;
        currentList.children.push(block);
        continue;
      }

      // Similar parent can't be found, assume new list
      currentList = listFromBlock(block);
      tree.push(currentList);
      continue;
    }

    // Different list props, different list style?
    if (block.listItem !== currentList.listItem) {
      var _match = findListMatching(tree[tree.length - 1], { level: block.level });
      if (_match && _match.listItem === block.listItem) {
        currentList = _match;
        currentList.children.push(block);
        continue;
      } else {
        currentList = listFromBlock(block);
        tree.push(currentList);
        continue;
      }
    }

    // eslint-disable-next-line no-console
    console.warn('Unknown state encountered for block', block);
    tree.push(block);
  }

  return tree;
}

function isListBlock(block) {
  return Boolean(block.listItem);
}

function blockMatchesList(block, list) {
  return block.level === list.level && block.listItem === list.listItem;
}

function listFromBlock(block) {
  return {
    _type: 'list',
    _key: block._key + '-parent',
    level: block.level,
    listItem: block.listItem,
    children: [block]
  };
}

function lastChild(block) {
  return block.children && block.children[block.children.length - 1];
}

function findListMatching(rootNode, matching) {
  var filterOnType = typeof matching.listItem === 'string';
  if (rootNode._type === 'list' && rootNode.level === matching.level && filterOnType && rootNode.listItem === matching.listItem) {
    return rootNode;
  }

  var node = lastChild(rootNode);
  if (!node) {
    return false;
  }

  return findListMatching(node, matching);
}

module.exports = nestLists;
//# sourceMappingURL=nestLists.js.map

/***/ }),

/***/ "./node_modules/@sanity/block-content-to-hyperscript/lib/serializers.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-hyperscript/lib/serializers.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");
var getImageUrl = __webpack_require__(/*! ./getImageUrl */ "./node_modules/@sanity/block-content-to-hyperscript/lib/getImageUrl.js");

module.exports = function (h, serializerOpts) {
  var serializeOptions = serializerOpts || { useDashedStyles: false

    // Low-level block serializer
  };function BlockSerializer(props) {
    var node = props.node,
        serializers = props.serializers,
        options = props.options,
        isInline = props.isInline,
        children = props.children;

    var blockType = node._type;
    var serializer = serializers.types[blockType];
    if (!serializer) {
      throw new Error('Unknown block type "' + blockType + '", please specify a serializer for it in the `serializers.types` prop');
    }

    return h(serializer, { node: node, options: options, isInline: isInline }, children);
  }

  // Low-level span serializer
  function SpanSerializer(props) {
    var _props$node = props.node,
        mark = _props$node.mark,
        children = _props$node.children;

    var isPlain = typeof mark === 'string';
    var markType = isPlain ? mark : mark._type;
    var serializer = props.serializers.marks[markType];
    if (!serializer) {
      // @todo Revert back to throwing errors?
      // eslint-disable-next-line no-console
      console.warn('Unknown mark type "' + markType + '", please specify a serializer for it in the `serializers.marks` prop');
      return h(props.serializers.markFallback, null, children);
    }

    return h(serializer, props.node, children);
  }

  // Low-level list serializer
  function ListSerializer(props) {
    var tag = props.type === 'bullet' ? 'ul' : 'ol';
    return h(tag, null, props.children);
  }

  // Low-level list item serializer
  function ListItemSerializer(props) {
    var children = !props.node.style || props.node.style === 'normal' ? // Don't wrap plain text in paragraphs inside of a list item
    props.children : // But wrap any other style in whatever the block serializer says to use
    h(props.serializers.types.block, props, props.children);

    return h('li', null, children);
  }

  // Renderer of an actual block of type `block`. Confusing, we know.
  function BlockTypeSerializer(props) {
    var style = props.node.style || 'normal';

    if (/^h\d/.test(style)) {
      return h(style, null, props.children);
    }

    return style === 'blockquote' ? h('blockquote', null, props.children) : h('p', null, props.children);
  }

  // Serializers for things that can be directly attributed to a tag without any props
  // We use partial application to do this, passing the tag name as the first argument
  function RawMarkSerializer(tag, props) {
    return h(tag, null, props.children);
  }

  function UnderlineSerializer(props) {
    var style = serializeOptions.useDashedStyles ? { 'text-decoration': 'underline' } : { textDecoration: 'underline' };

    return h('span', { style: style }, props.children);
  }

  function StrikeThroughSerializer(props) {
    return h('del', null, props.children);
  }

  function LinkSerializer(props) {
    return h('a', { href: props.mark.href }, props.children);
  }

  function ImageSerializer(props) {
    if (!props.node.asset) {
      return null;
    }

    var img = h('img', { src: getImageUrl(props) });
    return props.isInline ? img : h('figure', null, img);
  }

  // Serializer that recursively calls itself, producing a hyperscript tree of spans
  function serializeSpan(span, serializers, index, options) {
    if (span === '\n' && serializers.hardBreak) {
      return h(serializers.hardBreak, { key: 'hb-' + index });
    }

    if (typeof span === 'string') {
      return serializers.text ? h(serializers.text, { key: 'text-' + index }, span) : span;
    }

    var children = void 0;
    if (span.children) {
      children = {
        children: span.children.map(function (child, i) {
          return options.serializeNode(child, i, span.children, true);
        })
      };
    }

    var serializedNode = objectAssign({}, span, children);

    return h(serializers.span, {
      key: span._key || 'span-' + index,
      node: serializedNode,
      serializers: serializers
    });
  }

  var HardBreakSerializer = function HardBreakSerializer() {
    return h('br');
  };
  var defaultMarkSerializers = {
    strong: RawMarkSerializer.bind(null, 'strong'),
    em: RawMarkSerializer.bind(null, 'em'),
    code: RawMarkSerializer.bind(null, 'code'),
    underline: UnderlineSerializer,
    'strike-through': StrikeThroughSerializer,
    link: LinkSerializer
  };

  var defaultSerializers = {
    // Common overrides
    types: {
      block: BlockTypeSerializer,
      image: ImageSerializer
    },
    marks: defaultMarkSerializers,

    // Less common overrides
    list: ListSerializer,
    listItem: ListItemSerializer,

    block: BlockSerializer,
    span: SpanSerializer,
    hardBreak: HardBreakSerializer,

    // Container element
    container: 'div',

    // When we can't resolve the mark properly, use this renderer as the container
    markFallback: 'span',

    // Allow overriding text renderer, but leave undefined to just use plain strings by default
    text: undefined,

    // Empty nodes (React uses null, hyperscript with empty strings)
    empty: ''
  };

  return {
    defaultSerializers: defaultSerializers,
    serializeSpan: serializeSpan
  };
};
//# sourceMappingURL=serializers.js.map

/***/ }),

/***/ "./node_modules/@sanity/block-content-to-hyperscript/node_modules/@sanity/generate-help-url/index.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-hyperscript/node_modules/@sanity/generate-help-url/index.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var baseUrl = 'https://docs.sanity.io/help/'

module.exports = function generateHelpUrl(slug) {
  return baseUrl + slug
}


/***/ }),

/***/ "./node_modules/@sanity/block-content-to-react/lib/BlockContent.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-react/lib/BlockContent.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var PropTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
var internals = __webpack_require__(/*! @sanity/block-content-to-hyperscript/internals */ "./node_modules/@sanity/block-content-to-hyperscript/internals.js");

var _require = __webpack_require__(/*! ./targets/dom */ "./node_modules/@sanity/block-content-to-react/lib/targets/dom.js"),
    serializers = _require.serializers,
    serializeSpan = _require.serializeSpan,
    renderProps = _require.renderProps;

var getImageUrl = internals.getImageUrl,
    blocksToNodes = internals.blocksToNodes,
    mergeSerializers = internals.mergeSerializers;

var renderNode = React.createElement;

var SanityBlockContent = function SanityBlockContent(props) {
  var customSerializers = mergeSerializers(SanityBlockContent.defaultSerializers, props.serializers);

  var blockProps = Object.assign({}, renderProps, props, {
    serializers: customSerializers,
    blocks: props.blocks || []
  });

  return blocksToNodes(renderNode, blockProps, serializers, serializeSpan);
};

// Expose default serializers to the user
SanityBlockContent.defaultSerializers = serializers;

// Expose logic for building image URLs from an image reference/node
SanityBlockContent.getImageUrl = getImageUrl;

SanityBlockContent.propTypes = {
  className: PropTypes.string,
  renderContainerOnSingleChild: PropTypes.bool,

  // When rendering images, we need project id and dataset, unless images are materialized
  projectId: PropTypes.string,
  dataset: PropTypes.string,
  imageOptions: PropTypes.object,

  serializers: PropTypes.shape({
    // Common overrides
    types: PropTypes.object,
    marks: PropTypes.object,

    // Less common overrides
    list: PropTypes.func,
    listItem: PropTypes.func,

    // Low-level serializers
    block: PropTypes.func,
    span: PropTypes.func
  }),

  blocks: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({
    _type: PropTypes.string.isRequired
  })), PropTypes.shape({
    _type: PropTypes.string.isRequired
  })]).isRequired
};

SanityBlockContent.defaultProps = {
  renderContainerOnSingleChild: false,
  serializers: {},
  imageOptions: {}
};

module.exports = SanityBlockContent;
//# sourceMappingURL=BlockContent.js.map

/***/ }),

/***/ "./node_modules/@sanity/block-content-to-react/lib/targets/dom.js":
/*!************************************************************************!*\
  !*** ./node_modules/@sanity/block-content-to-react/lib/targets/dom.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _require = __webpack_require__(/*! @sanity/block-content-to-hyperscript/internals */ "./node_modules/@sanity/block-content-to-hyperscript/internals.js"),
    getSerializers = _require.getSerializers;

var renderNode = React.createElement;

var _getSerializers = getSerializers(renderNode),
    defaultSerializers = _getSerializers.defaultSerializers,
    serializeSpan = _getSerializers.serializeSpan;

module.exports = {
  serializeSpan: serializeSpan,
  serializers: defaultSerializers,
  renderProps: { nestMarks: true }
};
//# sourceMappingURL=dom.js.map

/***/ }),

/***/ "./node_modules/@sanity/image-url/index.js":
/*!*************************************************!*\
  !*** ./node_modules/@sanity/image-url/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// eslint-disable-next-line import/no-commonjs
module.exports = __webpack_require__(/*! ./lib/builder */ "./node_modules/@sanity/image-url/lib/builder.js").default


/***/ }),

/***/ "./node_modules/@sanity/image-url/lib/builder.js":
/*!*******************************************************!*\
  !*** ./node_modules/@sanity/image-url/lib/builder.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = urlBuilder;

var _urlForImage = _interopRequireDefault(__webpack_require__(/*! ./urlForImage */ "./node_modules/@sanity/image-url/lib/urlForImage.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var validFits = ['clip', 'crop', 'fill', 'fillmax', 'max', 'scale', 'min'];
var validCrops = ['top', 'bottom', 'left', 'right', 'center', 'focalpoint', 'entropy'];

var ImageUrlBuilder =
/*#__PURE__*/
function () {
  function ImageUrlBuilder(parent, options) {
    _classCallCheck(this, ImageUrlBuilder);

    if (parent) {
      this.options = _objectSpread({}, parent.options || {}, options || {});
    } else {
      this.options = options || {};
    }
  }

  _createClass(ImageUrlBuilder, [{
    key: "withOptions",
    value: function withOptions(options) {
      return new ImageUrlBuilder(this, options);
    } // The image to be represented. Accepts a Sanity 'image'-document, 'asset'-document or
    // _id of asset. To get the benefit of automatic hot-spot/crop integration with the content
    // studio, the 'image'-document must be provided.

  }, {
    key: "image",
    value: function image(source) {
      return this.withOptions({
        source: source
      });
    } // Specify the dataset

  }, {
    key: "dataset",
    value: function dataset(_dataset) {
      return this.withOptions({
        dataset: _dataset
      });
    } // Specify the projectId

  }, {
    key: "projectId",
    value: function projectId(_projectId) {
      return this.withOptions({
        projectId: _projectId
      });
    } // Specify background color

  }, {
    key: "bg",
    value: function bg(_bg) {
      return this.withOptions({
        bg: _bg
      });
    } // Specify the width of the image in pixels

  }, {
    key: "width",
    value: function width(_width) {
      return this.withOptions({
        width: _width
      });
    } // Specify the height of the image in pixels

  }, {
    key: "height",
    value: function height(_height) {
      return this.withOptions({
        height: _height
      });
    } // Specify focal point in fraction of image dimensions. Each component 0.0-1.0

  }, {
    key: "focalPoint",
    value: function focalPoint(x, y) {
      return this.withOptions({
        focalPoint: {
          x: x,
          y: y
        }
      });
    }
  }, {
    key: "maxWidth",
    value: function maxWidth(_maxWidth) {
      return this.withOptions({
        maxWidth: _maxWidth
      });
    }
  }, {
    key: "minWidth",
    value: function minWidth(_minWidth) {
      return this.withOptions({
        minWidth: _minWidth
      });
    }
  }, {
    key: "maxHeight",
    value: function maxHeight(_maxHeight) {
      return this.withOptions({
        maxHeight: _maxHeight
      });
    }
  }, {
    key: "minHeight",
    value: function minHeight(_minHeight) {
      return this.withOptions({
        minHeight: _minHeight
      });
    } // Specify width and height in pixels

  }, {
    key: "size",
    value: function size(width, height) {
      return this.withOptions({
        width: width,
        height: height
      });
    } // Specify blur between 0 and 100

  }, {
    key: "blur",
    value: function blur(_blur) {
      return this.withOptions({
        blur: _blur
      });
    }
  }, {
    key: "sharpen",
    value: function sharpen(_sharpen) {
      return this.withOptions({
        sharpen: _sharpen
      });
    } // Specify the desired rectangle of the image

  }, {
    key: "rect",
    value: function rect(left, top, width, height) {
      return this.withOptions({
        rect: {
          left: left,
          top: top,
          width: width,
          height: height
        }
      });
    } // Specify the image format of the image. 'jpg', 'pjpg', 'png', 'webp'

  }, {
    key: "format",
    value: function format(_format) {
      return this.withOptions({
        format: _format
      });
    }
  }, {
    key: "invert",
    value: function invert(_invert) {
      return this.withOptions({
        invert: _invert
      });
    } // Rotation in degrees 0, 90, 180, 270

  }, {
    key: "orientation",
    value: function orientation(_orientation) {
      return this.withOptions({
        orientation: _orientation
      });
    } // Compression quality 0-100

  }, {
    key: "quality",
    value: function quality(_quality) {
      return this.withOptions({
        quality: _quality
      });
    } // Make it a download link. Parameter is default filename.

  }, {
    key: "forceDownload",
    value: function forceDownload(download) {
      return this.withOptions({
        download: download
      });
    } // Flip image horizontally

  }, {
    key: "flipHorizontal",
    value: function flipHorizontal() {
      return this.withOptions({
        flipHorizontal: true
      });
    } // Flip image verically

  }, {
    key: "flipVertical",
    value: function flipVertical() {
      return this.withOptions({
        flipVertical: true
      });
    } // Ignore crop/hotspot from image record, even when present

  }, {
    key: "ignoreImageParams",
    value: function ignoreImageParams() {
      return this.withOptions({
        ignoreImageParams: true
      });
    }
  }, {
    key: "fit",
    value: function fit(value) {
      if (validFits.indexOf(value) === -1) {
        throw new Error("Invalid fit mode \"".concat(value, "\""));
      }

      return this.withOptions({
        fit: value
      });
    }
  }, {
    key: "crop",
    value: function crop(value) {
      if (validCrops.indexOf(value) === -1) {
        throw new Error("Invalid crop mode \"".concat(value, "\""));
      }

      return this.withOptions({
        crop: value
      });
    } // Gets the url based on the submitted parameters

  }, {
    key: "url",
    value: function url() {
      return (0, _urlForImage.default)(this.options);
    } // Synonym for url()

  }, {
    key: "toString",
    value: function toString() {
      return this.url();
    }
  }]);

  return ImageUrlBuilder;
}();

function urlBuilder(options) {
  // Did we get a SanityClient?
  if (options && _typeof(options.clientConfig) === 'object') {
    // Inherit config from client
    return new ImageUrlBuilder(null, {
      baseUrl: options.clientConfig.apiHost.replace(/^https:\/\/api\./, 'https://cdn.'),
      projectId: options.clientConfig.projectId,
      dataset: options.clientConfig.dataset
    });
  } // Or just accept the options as given


  return new ImageUrlBuilder(null, options);
}
//# sourceMappingURL=builder.js.map

/***/ }),

/***/ "./node_modules/@sanity/image-url/lib/parseAssetId.js":
/*!************************************************************!*\
  !*** ./node_modules/@sanity/image-url/lib/parseAssetId.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseAssetId;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var example = 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg';

function parseAssetId(ref) {
  var _ref$split = ref.split('-'),
      _ref$split2 = _slicedToArray(_ref$split, 4),
      id = _ref$split2[1],
      dimensionString = _ref$split2[2],
      format = _ref$split2[3];

  if (!id || !dimensionString || !format) {
    throw new Error("Malformed asset _ref '".concat(ref, "'. Expected an id like \"").concat(example, "\"."));
  }

  var _dimensionString$spli = dimensionString.split('x'),
      _dimensionString$spli2 = _slicedToArray(_dimensionString$spli, 2),
      imgWidthStr = _dimensionString$spli2[0],
      imgHeightStr = _dimensionString$spli2[1];

  var width = +imgWidthStr;
  var height = +imgHeightStr;
  var isValidAssetId = isFinite(width) && isFinite(height);

  if (!isValidAssetId) {
    throw new Error("Malformed asset _ref '".concat(ref, "'. Expected an id like \"").concat(example, "\"."));
  }

  return {
    id: id,
    width: width,
    height: height,
    format: format
  };
}
//# sourceMappingURL=parseAssetId.js.map

/***/ }),

/***/ "./node_modules/@sanity/image-url/lib/parseSource.js":
/*!***********************************************************!*\
  !*** ./node_modules/@sanity/image-url/lib/parseSource.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseSource;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Convert an asset-id, asset or image to an image record suitable for processing
// eslint-disable-next-line complexity
function parseSource(source) {
  if (!source) {
    return null;
  }

  var image;

  if (typeof source === 'string' && isUrl(source)) {
    // Someone passed an existing image url?
    image = {
      asset: {
        _ref: urlToId(source)
      }
    };
  } else if (typeof source === 'string') {
    // Just an asset id
    image = {
      asset: {
        _ref: source
      }
    };
  } else if (typeof source._ref === 'string') {
    // We just got passed an asset directly
    image = {
      asset: source
    };
  } else if (source._id) {
    // If we were passed an image asset document
    image = {
      asset: {
        _ref: source._id
      }
    };
  } else if (source.asset && source.asset.url && !source.asset._ref) {
    image = {
      asset: {
        _ref: urlToId(source.asset.url)
      }
    };
  } else if (_typeof(source.asset) === 'object') {
    image = source;
  } else {
    // We got something that does not look like an image, or it is an image
    // that currently isn't sporting an asset.
    return null;
  }

  if (source.crop) {
    image.crop = source.crop;
  }

  if (source.hotspot) {
    image.hotspot = source.hotspot;
  }

  return applyDefaults(image);
}

function isUrl(url) {
  return /^https?:\/\//.test("".concat(url));
}

function urlToId(url) {
  var parts = url.split('/').slice(-1);
  return "image-".concat(parts[0]).replace(/\.([a-z]+)$/, '-$1');
} // Mock crop and hotspot if image lacks it


function applyDefaults(image) {
  if (image.crop && image.hotspot) {
    return image;
  }

  return _objectSpread({
    crop: {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0
    },
    hotspot: {
      x: 0.5,
      y: 0.5,
      height: 1.0,
      width: 1.0
    }
  }, image);
}
//# sourceMappingURL=parseSource.js.map

/***/ }),

/***/ "./node_modules/@sanity/image-url/lib/urlForImage.js":
/*!***********************************************************!*\
  !*** ./node_modules/@sanity/image-url/lib/urlForImage.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = urlForImage;
Object.defineProperty(exports, "parseSource", {
  enumerable: true,
  get: function get() {
    return _parseSource.default;
  }
});

var _parseSource = _interopRequireDefault(__webpack_require__(/*! ./parseSource */ "./node_modules/@sanity/image-url/lib/parseSource.js"));

var _parseAssetId = _interopRequireDefault(__webpack_require__(/*! ./parseAssetId */ "./node_modules/@sanity/image-url/lib/parseAssetId.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SPEC_NAME_TO_URL_NAME_MAPPINGS = [['width', 'w'], ['height', 'h'], ['format', 'fm'], ['download', 'dl'], ['blur', 'blur'], ['sharpen', 'sharp'], ['invert', 'invert'], ['orientation', 'or'], ['minHeight', 'min-h'], ['maxHeight', 'max-h'], ['minWidth', 'min-w'], ['maxWidth', 'max-w'], ['quality', 'q'], ['fit', 'fit'], ['crop', 'crop']];

function urlForImage(options) {
  var spec = _objectSpread({}, options || {});

  var source = spec.source;
  delete spec.source;
  var image = (0, _parseSource.default)(source);

  if (!image) {
    return null;
  }

  var asset = (0, _parseAssetId.default)(image.asset._ref); // Compute crop rect in terms of pixel coordinates in the raw source image

  var crop = {
    left: Math.round(image.crop.left * asset.width),
    top: Math.round(image.crop.top * asset.height)
  };
  crop.width = Math.round(asset.width - image.crop.right * asset.width - crop.left);
  crop.height = Math.round(asset.height - image.crop.bottom * asset.height - crop.top); // Compute hot spot rect in terms of pixel coordinates

  var hotSpotVerticalRadius = image.hotspot.height * asset.height / 2;
  var hotSpotHorizontalRadius = image.hotspot.width * asset.width / 2;
  var hotSpotCenterX = image.hotspot.x * asset.width;
  var hotSpotCenterY = image.hotspot.y * asset.height;
  var hotspot = {
    left: hotSpotCenterX - hotSpotHorizontalRadius,
    top: hotSpotCenterY - hotSpotVerticalRadius,
    right: hotSpotCenterX + hotSpotHorizontalRadius,
    bottom: hotSpotCenterY + hotSpotHorizontalRadius
  };
  spec.asset = asset; // If irrelevant, or if we are requested to: don't perform crop/fit based on
  // the crop/hotspot.

  if (!(spec.rect || spec.focalPoint || spec.ignoreImageParams || spec.crop)) {
    spec = _objectSpread({}, spec, fit({
      crop: crop,
      hotspot: hotspot
    }, spec));
  }

  return specToImageUrl(spec);
} // eslint-disable-next-line complexity


function specToImageUrl(spec) {
  var cdnUrl = spec.baseUrl || 'https://cdn.sanity.io';
  var filename = "".concat(spec.asset.id, "-").concat(spec.asset.width, "x").concat(spec.asset.height, ".").concat(spec.asset.format);
  var baseUrl = "".concat(cdnUrl, "/images/").concat(spec.projectId, "/").concat(spec.dataset, "/").concat(filename);
  var params = [];

  if (spec.rect) {
    // Only bother url with a crop if it actually crops anything
    var isEffectiveCrop = spec.rect.left != 0 || spec.rect.top != 0 || spec.rect.height != spec.asset.height || spec.rect.width != spec.asset.width;

    if (isEffectiveCrop) {
      params.push("rect=".concat(spec.rect.left, ",").concat(spec.rect.top, ",").concat(spec.rect.width, ",").concat(spec.rect.height));
    }
  }

  if (spec.bg) {
    params.push("bg=".concat(spec.bg));
  }

  if (spec.focalPoint) {
    params.push("fp-x=".concat(spec.focalPoint.x));
    params.push("fp-x=".concat(spec.focalPoint.y));
  }

  if (spec.flipHorizontal || spec.flipVertical) {
    params.push("flip=".concat(spec.flipHorizontal ? 'h' : '').concat(spec.flipVertical ? 'v' : ''));
  } // Map from spec name to url param name, and allow using the actual param name as an alternative


  SPEC_NAME_TO_URL_NAME_MAPPINGS.forEach(function (mapping) {
    var _mapping = _slicedToArray(mapping, 2),
        specName = _mapping[0],
        param = _mapping[1];

    if (typeof spec[specName] !== 'undefined') {
      params.push("".concat(param, "=").concat(encodeURIComponent(spec[specName])));
    } else if (typeof spec[param] !== 'undefined') {
      params.push("".concat(param, "=").concat(encodeURIComponent(spec[param])));
    }
  });

  if (params.length === 0) {
    return baseUrl;
  }

  return "".concat(baseUrl, "?").concat(params.join('&'));
}

function fit(source, spec) {
  var result = {
    width: spec.width,
    height: spec.height // If we are not constraining the aspect ratio, we'll just use the whole crop

  };

  if (!(spec.width && spec.height)) {
    result.rect = source.crop;
    return result;
  }

  var crop = source.crop;
  var hotspot = source.hotspot; // If we are here, that means aspect ratio is locked and fitting will be a bit harder

  var desiredAspectRatio = spec.width / spec.height;
  var cropAspectRatio = crop.width / crop.height;

  if (cropAspectRatio > desiredAspectRatio) {
    // The crop is wider than the desired aspect ratio. That means we are cutting from the sides
    var _height = crop.height;

    var _width = _height * desiredAspectRatio;

    var _top = crop.top; // Center output horizontally over hotspot

    var hotspotXCenter = (hotspot.right - hotspot.left) / 2 + hotspot.left;

    var _left = hotspotXCenter - _width / 2; // Keep output within crop


    if (_left < crop.left) {
      _left = crop.left;
    } else if (_left + _width > crop.left + crop.width) {
      _left = crop.left + crop.width - _width;
    }

    result.rect = {
      left: Math.round(_left),
      top: Math.round(_top),
      width: Math.round(_width),
      height: Math.round(_height)
    };
    return result;
  } // The crop is taller than the desired ratio, we are cutting from top and bottom


  var width = crop.width;
  var height = width / desiredAspectRatio;
  var left = crop.left; // Center output vertically over hotspot

  var hotspotYCenter = (hotspot.bottom - hotspot.top) / 2 + hotspot.top;
  var top = hotspotYCenter - height / 2; // Keep output rect within crop

  if (top < crop.top) {
    top = crop.top;
  } else if (top + height > crop.top + crop.height) {
    top = crop.top + crop.height - height;
  }

  result.rect = {
    left: Math.max(0, Math.floor(left)),
    top: Math.max(0, Math.floor(top)),
    width: Math.round(width),
    height: Math.round(height)
  };
  return result;
} // For backwards-compatibility
//# sourceMappingURL=urlForImage.js.map

/***/ }),

/***/ "./pages/kdo-jsme.js":
/*!***************************!*\
  !*** ./pages/kdo-jsme.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return KdoJsme; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/styles.scss */ "./styles/styles.scss");
/* harmony import */ var _styles_styles_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_styles_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Head */ "./components/Head.js");
/* harmony import */ var _components_Content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Content */ "./components/Content.js");
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Header */ "./components/Header.js");
/* harmony import */ var _sanity_block_content_to_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sanity/block-content-to-react */ "./node_modules/@sanity/block-content-to-react/lib/BlockContent.js");
/* harmony import */ var _sanity_block_content_to_react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_sanity_block_content_to_react__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "/Users/decent_descent/Desktop/dobre-bydlo.eu/pages/kdo-jsme.js";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var sanityClient = __webpack_require__(/*! @sanity/client */ "./node_modules/@sanity/client/lib/sanityClient.js");


var client = sanityClient({
  projectId: "6rx0nq6y",
  dataset: "dobrebydloeudata"
});

var KdoJsme =
/*#__PURE__*/
function (_React$Component) {
  _inherits(KdoJsme, _React$Component);

  function KdoJsme() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, KdoJsme);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(KdoJsme)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      navOpened: false,
      loading: true
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "navToggle", function () {
      _this.setState({
        navOpened: !_this.state.navOpened
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "navHandler", function () {
      _this.setState({
        navOpened: false
      });
    });

    return _this;
  }

  _createClass(KdoJsme, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      client.fetch("\n        * | [ _type == \"page\" && slug.current == \"kdo-jsme\"]| {\n          _id,\n          title,\n          content,\n        }").then(function (res) {
        _this2.setState({
          loading: false,
          pageTitle: res[0].title,
          pageContent: res[0].content
        });

        yar;
      }).catch(function (err) {
        console.error("Oh no, error occured: ", err);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Head__WEBPACK_IMPORTED_MODULE_2__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 56
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Header__WEBPACK_IMPORTED_MODULE_4__["default"], {
        handleNav: this.handleNav,
        handleNavItem: this.handleNavItem,
        navToggle: this.navToggle,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Content__WEBPACK_IMPORTED_MODULE_3__["default"], {
        extraClass: "content--centered",
        navOpened: this.state.navOpened,
        navHandler: this.navHandler,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 62
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content__container",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68
        },
        __self: this
      }, this.state.pageTitle), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "static/gallery/home.jpg",
        className: "about",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        },
        __self: this
      }))));
    }
  }]);

  return KdoJsme;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


    (function (Component, route) {
      if(!Component) return
      if (false) {}
      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/kdo-jsme")
  
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=kdo-jsme.js.f78570459e40e5b3c7f5.hot-update.js.map