import grapesjs from "grapesjs";
import loadCommand from "./command";

export default grapesjs.plugins.add("exportCodePlugin", (editor, opts = {}) => {
  const defaultOpts = {};
  const options = Object.assign({}, defaultOpts, opts);
  loadCommand(editor, options);
});
