import grapesjs from "grapesjs";
import loadCommand from "./commands";

export default grapesjs.plugins.add(
  "grapesjs-blocks-asiaone",
  (editor, opts = {}) => {
    window.editor = editor;
    const opts_blocks = opts.blocks || {};
    const opts_labels = opts.labels || {};
    const opts_categories = opts.blockCategories || {};

    delete opts["blocks"];
    delete opts["labels"];
    delete opts["blockCategories"];

    const default_blocks = {
      container: true,
      row: true,
      column: true,
    };

    const default_labels = {
      contaniner: "Container",
      row: "Row",
      column: "Column",
    };

    const default_categories = {
      layout: true,
    };

    let options = {
      ...{
        blocks: Object.assign(default_blocks, opts_blocks),
        labels: Object.assign(default_labels, opts_labels),
        blockCategories: Object.assign(default_categories, opts_categories),
        optionsStringSeparator: "::",
        gridDevices: true,
        gridDevicesPanel: false,
        classNavigation: "nav",
        classTabPanes: "tab-content",
        classTabPane: "tab-pane",
        classTab: "nav-item",
      },
      ...opts,
    };

    loadCommand(editor, options);
  }
);
