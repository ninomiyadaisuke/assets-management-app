export const colors = [
  "#507dbe",
  "#e68a5e",
  "#53a88e",
  "#9b7ca7",
  "#e8c865",
  "#c9845c",
  "#6dbbd8",
  "#d35e8e",
  "#7dbf7c",
  "#e381a6",
  "#c5a166",
  "#86c9aa",
  "#e68cb6",
  "#c56e3a",
  "#7fb8eb",
  "#c775a4",
  "#e8d083",
  "#aa7255",
  "#66a380",
  "#e88ac8",
  "#edd477",
  "#a8785a",
  "#5ca883",
  "#c77ca1",
  "#e8c480",
  "#b6603a",
  "#75b6cc",
  "#aa7499",
  "#8faa5e",
  "#e861a3",
  "#c59c44",
  "#4588c7",
  "#a7858b",
] as const;

export type Colors = typeof colors;
export type Color = Colors[number];
