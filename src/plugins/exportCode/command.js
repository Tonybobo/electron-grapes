import configuration from "../../config";

export default (editor, config) => {
  const { Commands } = editor;

  const codeViewer = editor.CodeManager.getViewer("CodeMirror").clone();
  const container = document.createElement("div");
  const modal = editor.Modal;

  let viewerEditor = codeViewer.editor;

  codeViewer.set({
    codeName: "htmlmixed",
    readOnly: 1,
    theme: "hopscotch",
    autoBeautify: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    lineWrapping: true,
    styleActiveLine: true,
    smartIndent: true,
    indentWithTabs: true,
  });

  Commands.add("export-code", {
    run(editor) {
      let innerHTML = editor.getHtml();
      let innerCss = editor.getCss();
      let innerJS = editor.getJs();

      const cdnCss = configuration.canvas.styles;
      const cdnJS = configuration.canvas.scripts;

      if (cdnCss) {
        cdnCss.map((css) => {
          if (!css.includes("bootstrap"))
            innerHTML = `<link rel = "stylesheet" href=${css} />` + innerHTML;
        });
      }

      if (cdnJS) {
        cdnJS.map((js) => {
          if (!js.includes("bootstrap"))
            innerHTML = `<script src=${js} /></script>` + innerHTML;
        });
      }

      if (innerJS) {
        innerHTML = `<script>${innerJS}</script>` + innerHTML;
      }

      // Push BootStrap CDN
      innerHTML =
        '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">' +
        innerHTML;
      innerHTML =
        '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>' +
        innerHTML;

      if (!viewerEditor) {
        let textarea = document.createElement("textarea");
        container.append(textarea);
        codeViewer.init(textarea);
        viewerEditor = codeViewer.editor;
      }

      modal.setTitle("Export Code");
      modal.setContent("");
      modal.setContent(container);
      codeViewer.setContent(
        '<style type="text/css">\n' + innerCss + "</style>" + innerHTML
      );
      modal.open();
      viewerEditor.refresh();
    },
  });
};
