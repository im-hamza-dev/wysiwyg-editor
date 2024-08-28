import React, { useEffect, useRef, useState } from "react";
import "./App.scss";
import Editor from "./components/quillEditor/quillEditor.component";
import Quill from "quill";
import TurndownService from "turndown";

const Delta = Quill.import("delta");

const App = () => {
  const [range, setRange] = useState<any>();
  const [lastChange, setLastChange] = useState<any>();
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState<any>({});

  let highlights = ["entrepreneur", "biological age"];
  // Use a ref to access the quill instance directly
  const quillRef: any = useRef();
  const toolbarRef: any = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (toolbarRef.current && !toolbarRef.current?.contains(event.target)) {
        setShowToolbar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const openToolbar = () => {
      if (!quillRef?.current) {
        return;
      }
      const quillEditor = quillRef?.current;

      if (range?.length > 0) {
        const bounds = quillEditor.getBounds(range.index);
        setToolbarPosition({
          top: bounds.top + 65,
          left: bounds.left - 15,
        });
        setShowToolbar(true);
      }
    };
    openToolbar();
  }, [range]);

  const searchKeywords = () => {
    if (quillRef.current) {
      let content: string = quillRef.current.root.innerHTML;
      highlights.forEach((word: string) => {
        const regex = new RegExp(`${word}`, "gi");
        content = content.replace(
          regex,
          `<span id="highlighted">${word}</span>`
        );
      });

      quillRef.current.root.innerHTML = content;
    }
  };

  const getMarkdown = () => {
    if (!quillRef?.current) return null;
    const turndownService = new TurndownService({ headingStyle: "atx" });

    const markdownContent = turndownService.turndown(
      quillRef?.current?.root?.innerHTML
    );
    return markdownContent;
  };
  return (
    <div className="app-wrapper">
      <h1> Demo for WYSIWYG Editor</h1>
      <div className="cards-wrapper">
        <div className="editor-parent">
          <div
            ref={toolbarRef}
            className={`quill-popup-toolbar ${
              showToolbar ? "showToolbar" : "hideToolbar"
            }`}
            style={{
              top: `${toolbarPosition.top}px`,
              left: `${toolbarPosition.left}px`,
            }}
          >
            <button onClick={() => quillRef.current.format("bold", true)}>
              Bold
            </button>
            <button onClick={() => quillRef.current.format("italic", true)}>
              Italic
            </button>
            <button onClick={() => quillRef.current.format("underline", true)}>
              Underline
            </button>
            <button onClick={() => quillRef.current.format("blockquote", true)}>
              Quote
            </button>
            <button onClick={() => quillRef.current.format("code-block", true)}>
              Code
            </button>

            <button
              onClick={() =>
                quillRef.current.removeFormat(range.index, range.length)
              }
            >
              Clean
            </button>
            {/* Add more formatting options as needed */}
          </div>

          <Editor
            ref={quillRef}
            onSelectionChange={setRange}
            onTextChange={setLastChange}
          />

          <button className="search-btn" onClick={searchKeywords}>
            Search
          </button>
          <div className="keywords">Keywords: entrepreneur, biological age</div>
        </div>
        <span
          spellCheck="false"
          className="html-wrapper cm-content"
          style={{
            tabSize: 2,
            flexBasis: 2344,
            display: "block",
            whiteSpace: "pre-wrap",
            overflowY: "auto",
          }}
          role="textbox"
          aria-multiline="true"
          aria-labelledby="codemirror-label focus-trap-help-panel"
          data-language="markdown"
          aria-autocomplete="list"
        >
          {/* {quillRef?.current?.getSemanticHTML()} */}
          {getMarkdown()}
        </span>
      </div>
    </div>
  );
};

export default App;
