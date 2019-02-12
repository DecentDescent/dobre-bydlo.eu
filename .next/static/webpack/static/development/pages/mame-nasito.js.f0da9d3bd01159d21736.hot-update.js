webpackHotUpdate("static/development/pages/mame-nasito.js",{

/***/ "./pages/mame-nasito.js":
/*!******************************!*\
  !*** ./pages/mame-nasito.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MameNasito; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/styles.scss */ "./styles/styles.scss");
/* harmony import */ var _styles_styles_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_styles_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Head */ "./components/Head.js");
/* harmony import */ var _components_Content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Content */ "./components/Content.js");
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Header */ "./components/Header.js");
/* harmony import */ var react_photoswipe_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-photoswipe-component */ "./node_modules/react-photoswipe-component/build/index.js");
/* harmony import */ var react_photoswipe_component__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_photoswipe_component__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _sanity_block_content_to_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sanity/block-content-to-react */ "./node_modules/@sanity/block-content-to-react/lib/BlockContent.js");
/* harmony import */ var _sanity_block_content_to_react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_sanity_block_content_to_react__WEBPACK_IMPORTED_MODULE_6__);
var _jsxFileName = "/Users/decent_descent/Desktop/dobre-bydlo.eu/pages/mame-nasito.js";


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
var PHOTO_ITEMS = [{
  src: "static/gallery/mame-nasito/1.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/2.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/3.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/4.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/5.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/6.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/7.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/8.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/9.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/10.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/11.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/12.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/13.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/14.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/15.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/16.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/17.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/18.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/19.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/20.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/21.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/22.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/23.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/24.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/25.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/26.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/27.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/28.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/29.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/30.jpg",
  w: 1200,
  h: 800
}, {
  src: "static/gallery/mame-nasito/31.jpg",
  w: 1200,
  h: 800
}];

var MameNasito =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MameNasito, _React$Component);

  function MameNasito() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MameNasito);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MameNasito)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      navOpened: false,
      loading: true,
      pageTitle: "Máme našito",
      pageDescription: "Máme rády ruční práce, šití, tvořiost, látky. Daly jsme se dohromady, abychom dávaly látkám hloubku, tvar a harmonii.",
      images: [{
        src: "static/gallery/mame-nasito/30.jpg",
        w: 1200,
        h: 800
      }, {
        src: "static/gallery/mame-nasito/31.jpg",
        w: 1200,
        h: 800
      }]
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

  _createClass(MameNasito, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      client.fetch("\n      * | [ _type == \"galerie\" && slug.current == \"mame-nasito\"]| {\n        _id,\n        title,\n        description,\n        content,\n      }").then(function (res) {
        _this2.setState({
          loading: false,
          pageTitle: res[0].title,
          pageDescription: res[0].description[0].children[0].text
        });
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
          lineNumber: 228
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Head__WEBPACK_IMPORTED_MODULE_2__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 229
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Header__WEBPACK_IMPORTED_MODULE_4__["default"], {
        handleNav: this.handleNav,
        handleNavItem: this.handleNavItem,
        navToggle: this.navToggle,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 230
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Content__WEBPACK_IMPORTED_MODULE_3__["default"], {
        navOpened: this.state.navOpened,
        navHandler: this.navHandler,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 235
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content__container",
        navOpened: this.state.navOpened,
        navHandler: this.navHandler,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 236
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 241
        },
        __self: this
      }, this.state.pageTitle), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 242
        },
        __self: this
      }, this.state.pageDescription)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "section__gallery",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 244
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_photoswipe_component__WEBPACK_IMPORTED_MODULE_5__["PhotoSwipeGallery"], {
        items: this.state.images,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 245
        },
        __self: this
      }))));
    }
  }]);

  return MameNasito;
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
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/mame-nasito")
  
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=mame-nasito.js.f0da9d3bd01159d21736.hot-update.js.map