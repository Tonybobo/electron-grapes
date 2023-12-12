import grapesjs from "grapesjs";
import "./plugins";
import config from "./config";
import Menu from "./menu";

const editor = grapesjs.init(config);

const addFonts = () => {
  let styleManager = editor.StyleManager;
  let fontProperty = styleManager.getProperty("typography", "font-family");
  let list = fontProperty.get("options");
  list.push({ value: "Visby-CF, sans-serif", name: "Visby CF" });
  fontProperty.set("list", list);
  styleManager.render();
};

// On component change show the Style Manager
editor.on("component:selected", () => {
  const pn = editor.Panels;

  if (editor.getSelected()) {
    const openSmBtn = pn.getButton("views", "open-style-manager");
    openSmBtn && openSmBtn.set("active", 1);
  }
});

editor.on("load", () => {
  addFonts();
});

Menu(editor);
