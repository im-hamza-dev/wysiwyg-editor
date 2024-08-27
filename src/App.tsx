import React, { useRef, useState } from "react";
import "./App.scss";
import Editor from "./components/quillEditor/quillEditor.component";
import Quill from "quill";
import TurndownService  from 'turndown'

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
        const regex = new RegExp(`${word}`, "gi");
        content = content.replace(
          regex,
          `<span id="highlighted">${word}</span>`
        );
      });

      quillRef.current.root.innerHTML = content;
    }
  };

  const getMarkdown=()=>{
    if(!quillRef?.current)return null
    const turndownService = new TurndownService();
    const markdownContent = turndownService.turndown(quillRef?.current?.root?.innerHTML);
    return  markdownContent;
  }
  return (
    <div className="app-wrapper">
      <h1> Demo for WYSIWYG Editor</h1>
      <div className="cards-wrapper">
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
        <div className="html-wrapper">
          {/* {quillRef?.current?.getSemanticHTML()} */}
          {getMarkdown()}
        </div>
        
      </div>
    </div>
  );
};

export default App;
