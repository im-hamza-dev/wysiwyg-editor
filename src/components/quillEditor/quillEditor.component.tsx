import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import Quill from "quill";
import { fontSizeArr, quillModules } from "./helper";
import "./quillEditor.scss";
import "./quillsnow.module.scss";

// Editor is an uncontrolled React component
const Editor = forwardRef(
  ({ defaultValue, onTextChange, onSelectionChange }: any, ref: any) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      var Size: any = Quill.import("attributors/style/size");
      Size.whitelist = fontSizeArr;
      Quill.register(Size, true);
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

      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

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
