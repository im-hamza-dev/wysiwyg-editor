import React, { useEffect, useRef, useState } from "react";
import "./App.scss";
import Editor from "./components/quillEditor/quillEditor.component";
import Quill, { Range } from "quill";
import TurndownService from "turndown";

const Delta = Quill.import("delta");

interface Position {
  top: number;
  left: number;
}

const App = () => {
  const [range, setRange] = useState<Range>({ index: 0, length: 0 });
  const [lastChange, setLastChange] = useState<any>();
  const [showToolbar, setShowToolbar] = useState<boolean>(false);
  const [toolbarPosition, setToolbarPosition] = useState<any>({
    top: 0,
    left: 0,
  });
  const [markdown, setMarkdown] = useState<string>("");

  let highlights = ["entrepreneur", "biological age"];
  // Use a ref to access the quill instance directly
  const quillRef: any = useRef();
  const toolbarRef: React.MutableRefObject<any> = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (toolbarRef.current && !toolbarRef?.current?.contains(event.target)) {
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
    const turndownService = new TurndownService({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
    });
    turndownService.addRule("codeBlock", {
      filter: function (node) {
        return (
          node.nodeName === "DIV" && node.classList.contains("ql-code-block")
        );
      },
      replacement: function (content, node) {
        return `\`\`\`js\n${content}\n\`\`\``;
      },
    });
    const markdownContent = turndownService.turndown(
      quillRef?.current?.root?.innerHTML
    );

    setMarkdown(markdownContent);
  };

  const fileInputRef = useRef<any>(null);
  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const insertImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const quill = quillRef.current;

        quill.insertEmbed(range.index, "image", e.target.result);
      };
      reader.readAsDataURL(file);
    }
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
            <button onClick={() => quillRef.current.format("color", "red")}>
              Red
            </button>
            <button onClick={() => quillRef.current.format("color", "blue")}>
              Blue
            </button>
            <button onClick={handleImageUpload}>Image</button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={insertImage}
              accept="image/*"
              style={{ display: "none" }}
            />

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
          <button className="markdown-btn" onClick={getMarkdown}>
            Generate Markdown
          </button>
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
          {markdown}
        </span>
      </div>
    </div>
  );
};

export default App;
