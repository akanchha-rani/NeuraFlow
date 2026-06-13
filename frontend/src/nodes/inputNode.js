import { createNode } from "./BaseNode";
import { Upload } from "lucide-react";

export const InputNode = createNode({
  label: "Input Trigger",
  icon: <Upload size={16} />,
  gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
  width: 240,
  inputs: [],
  outputs: [{ id: "value", label: "value" }],
  fields: [
    {
      id: "inputName",
      type: "text",
      label: "Variable Name",
      defaultValue: "input_0",
      placeholder: "Variable name",
    },
    {
      id: "inputType",
      type: "select",
      label: "Data Type",
      defaultValue: "Text",
      options: ["Text", "File", "Image", "Number"],
    },
  ],
});
