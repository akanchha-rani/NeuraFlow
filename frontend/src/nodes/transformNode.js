import { createNode } from "./BaseNode";
import { RefreshCcw } from "lucide-react";

export const TransformNode = createNode({
  label: "Data Transform",
  icon: <RefreshCcw size={16} />,
  gradient: "linear-gradient(135deg, #10b981, #047857)",
  width: 240,
  inputs: [{ id: "input", label: "input" }],
  outputs: [{ id: "output", label: "output" }],
  fields: [
    {
      id: "operation",
      type: "select",
      label: "Modifier Action",
      defaultValue: "uppercase",
      options: [
        { value: "uppercase", label: " UPPERCASE" },
        { value: "lowercase", label: " lowercase" },
        { value: "trim", label: " Trim Whitespace" },
        { value: "reverse", label: " Reverse String" },
        { value: "stringify", label: " Stringify Payload" },
        { value: "parse JSON", label: " Parse JSON Object" },
        { value: "base64 encode", label: " Base64 Encode" },
      ],
    },
  ],
});
