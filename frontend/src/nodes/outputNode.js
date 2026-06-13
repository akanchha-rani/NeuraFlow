import { createNode } from "./BaseNode";
import { Download } from "lucide-react";

export const OutputNode = createNode({
  label: "Output Terminal",
  icon: <Download size={16} />,
  gradient: "linear-gradient(135deg, #f97316, #c2410c)",
  width: 240,
  inputs: [{ id: "value", label: "value" }],
  outputs: [],
  fields: [
    {
      id: "outputName",
      type: "text",
      label: "Variable Key",
      defaultValue: "output_0",
      placeholder: "Enter variable name…",
    },
    {
      id: "outputType",
      type: "select",
      label: "Data Schema",
      defaultValue: "Text",
      options: ["Text", "Image", "File", "Number"],
    },
  ],
});
