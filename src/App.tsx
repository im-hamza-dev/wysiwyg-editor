import React, { useRef, useState } from "react";
import "./App.scss";
import Editor from "./components/quillEditor/quillEditor.component";
import Quill from "quill";

const Delta = Quill.import("delta");

const App = () => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState<any>();
  let highlights = ["entrepreneur", "biological age"];
  // Use a ref to access the quill instance directly
  const quillRef: any = useRef();

  const searchKeywords = () => {
    if (quillRef.current) {
      let content: string = quillRef.current.root.innerHTML;
      highlights.forEach((word: string) => {
        const regex = new RegExp(`\\b${word}\\b`, "gi");
        if (content.includes(word)) {
          content = content.replace(
            regex,
            `<span id="highlighted">${word}</span>`
          );
        }
      });
      quillRef.current.root.innerHTML = content;
    }
  };
  return (
    <div className="app-wrapper">
      <h1> Demo for WYSIWYG Editor</h1>
      <div>
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
    </div>
  );
};

export default App;
