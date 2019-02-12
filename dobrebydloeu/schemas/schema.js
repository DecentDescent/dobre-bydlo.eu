import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import blockContent from "./blockContent";
import page from "./page";
import galerie from "./galerie";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([blockContent, page, galerie])
});
