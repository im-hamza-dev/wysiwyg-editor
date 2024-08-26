import React, { useRef, useState } from "react";
import "./App.scss";
import Editor from "./components/quillEditor/quillEditor.component";
import Quill from "quill";

const Delta = Quill.import("delta");

const App = () => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState<any>();
  const [readOnly, setReadOnly] = useState<any>(false);

  // Use a ref to access the quill instance directly
  const quillRef: any = useRef();

  return (
    <div className="app-wrapper">
      <h1> Demo for WYSIWYG Editor</h1>
      <div>
        <Editor
          ref={quillRef}
          readOnly={readOnly}
          defaultValue={new Delta()
            .insert("Hello")
            .insert("\n", { header: 1 })
            .insert("Some ")
            .insert("initial", { bold: true })
            .insert(" ")
            .insert("content", { underline: true })
            .insert("\n")}
          onSelectionChange={setRange}
          onTextChange={setLastChange}
        />
      </div>
    </div>
  );
};

export default App;
