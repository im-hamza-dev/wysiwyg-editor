// import React, { useRef, useState } from "react";
// const Delta = Quill.import("delta");
// import "./quillsnow.module.scss";

// const Editor = () => {
//   const [content, setContent] = useState("");
//   const editor = useRef<any>();
//   const fontSizeArr = [
//     "8px",
//     "9px",
//     "10px",
//     "12px",
//     "13px",
//     "14px",
//     "15px",
//     "16px",
//     "17px",
//     "18px",
//     "19px",
//     "20px",
//     "22px",
//     "24px",
//     "28px",
//     "32px",
//     "42px",
//     "54px",
//     "68px",
//     "84px",
//     "98px",
//   ];

//   var Size = Quill.import("attributors/style/size");
//   Size.whitelist = fontSizeArr;
//   Quill.register(Size, true);
//   Quill.register({ "modules/better-table": QuillBetterTable }, true);

//   var Parchment = Quill.import("parchment");
//   let config = { scope: Parchment.Scope.BLOCK };
//   // let SpanWrapper = new Parchment.ClassAttributor('span-wrapper', '#span-wrapper', config);
//   // Quill.register(SpanWrapper, true);
//   // var icons = Quill.import('ui/icons');
//   // icons['span-wrapper'] = 'sw';

//   let IdAttribute = new Parchment.Attributor("id-attribute", "id", config);
//   Quill.register(IdAttribute, true);
//   var icons = Quill.import("ui/icons");
//   icons["id-attribute"] = "Featured";

//   var idButton = document.querySelector(".ql-id-attribute");

//   return (
//     <div>
//       <ReactQuill
//         ref={editor}
//         id="quillElementSelector"
//         // className={styles.quillParent}
//         onChange={setContent}
//         value={content}
//         theme="snow"
//         modules={{
//           toolbar: {
//             container: [
//               [{ header: "1" }, { header: "2" }],
//               [{ size: fontSizeArr }],
//               [
//                 "bold",
//                 "italic",
//                 "underline",
//                 "strike",
//                 "blockquote",
//                 "code-block",
//               ],
//               [{ script: "sub" }, { script: "super" }],
//               [
//                 { align: "" },
//                 { align: "center" },
//                 { align: "right" },
//                 { align: "justify" },
//               ],

//               [
//                 { list: "ordered" },
//                 { list: "bullet" },
//                 { indent: "-1" },
//                 { indent: "+1" },
//               ],
//               ["link", "image", "video"],
//               ["clean"],
//               ["id-attribute"],
//             ],
//           },
//           table: false, // disable table module
//           "better-table": {
//             operationMenu: {
//               items: {
//                 unmergeCells: {
//                   text: "Another unmerge cells name",
//                 },
//               },
//             },
//           },
//           keyboard: {
//             bindings: QuillBetterTable.keyboardBindings,
//           },
//           clipboard: {
//             matchVisual: false,
//           },
//         }}
//         placeholder={"Write something ..."}
//       />
//     </div>
//   );
// };

// export default Editor;

import React from "react";

const Editro = () => {
  return <div></div>;
};

export default Editro;
