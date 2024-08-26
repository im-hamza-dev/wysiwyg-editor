import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import "./quillEditor.scss";
import Quill from "quill";
import "./quillsnow.module.scss";

// Editor is an uncontrolled React component
const Editor = forwardRef(
  (
    { readOnly, defaultValue, onTextChange, onSelectionChange }: any,
    ref: any
  ) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });
    const fontSizeArr = [
      "8px",
      "9px",
      "10px",
      "12px",
      "13px",
      "14px",
      "15px",
      "16px",
      "17px",
      "18px",
      "19px",
      "20px",
      "22px",
      "24px",
      "28px",
      "32px",
      "42px",
      "54px",
      "68px",
      "84px",
      "98px",
    ];

    var Size: any = Quill.import("attributors/style/size");
    Size.whitelist = fontSizeArr;
    Quill.register(Size, true);
    // Quill.register({ "modules/better-table": QuillBetterTable }, true);

    var Parchment = Quill.import("parchment");
    let config = { scope: Parchment.Scope.BLOCK };
    // let SpanWrapper = new Parchment.ClassAttributor('span-wrapper', '#span-wrapper', config);
    // Quill.register(SpanWrapper, true);
    // var icons = Quill.import('ui/icons');
    // icons['span-wrapper'] = 'sw';

    let IdAttribute = new Parchment.Attributor("id-attribute", "id", config);
    Quill.register(IdAttribute, true);
    var icons: any = Quill.import("ui/icons");
    icons["id-attribute"] = "Featured";

    var idButton = document.querySelector(".ql-id-attribute");

    let quillModules = {
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }],
          [{ size: fontSizeArr }],
          ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
          // [{ script: "sub" }, { script: "super" }],
          [
            { align: "" },
            { align: "center" },
            { align: "right" },
            { align: "justify" },
          ],

          [
            { list: "ordered" },
            { list: "bullet" },
            // { indent: "-1" },
            // { indent: "+1" },
          ],
          ["image"],
          ["clean"],
          ["id-attribute"],
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        ],
      },
      table: false, // disable table module
      "better-table": {
        operationMenu: {
          items: {
            unmergeCells: {
              text: "Another unmerge cells name",
            },
          },
        },
      },
      //   keyboard: {
      //     bindings: QuillBetterTable.keyboardBindings,
      //   },
      clipboard: {
        matchVisual: false,
      },
    };

    useEffect(() => {
      ref?.current?.enable(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
      const container: any = containerRef.current;
      if (container) {
        const editorContainer = container.appendChild(
          container.ownerDocument.createElement("div")
        );
        const quill = new Quill(editorContainer, {
          theme: "snow",
          modules: quillModules,
        });
        editorContainer.classList.add("editor");
        editorContainer.classList.add("editorParent");

        ref.current = quill;

        if (defaultValueRef.current) {
          quill.setContents(defaultValueRef.current);
        }

        quill.on(Quill.events.TEXT_CHANGE, (...args) => {
          onTextChangeRef.current?.(...args);
        });

        quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
          onSelectionChangeRef.current?.(...args);
        });

        return () => {
          ref.current = null;
          container.innerHTML = "";
        };
      }
    }, [ref]);

    return <div ref={containerRef}></div>;
  }
);

Editor.displayName = "Editor";

export default Editor;
