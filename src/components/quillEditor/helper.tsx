export const fontSizeArr: string[] = [
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

export let quillModules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }],
      [{ size: fontSizeArr }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],

      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],

      [{ list: "ordered" }, { list: "bullet" }],
      ["image"],
      ["clean"],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    ],
  },
  table: false, // disable table module
  clipboard: {
    matchVisual: false,
  },
};
