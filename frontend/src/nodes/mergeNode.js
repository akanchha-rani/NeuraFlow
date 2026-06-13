import { createNode } from "./BaseNode";
import { GitMerge } from "lucide-react";

export const MergeNode = createNode({
  label: "Stream Merger",
  icon: <GitMerge size={16} />,
  gradient: "linear-gradient(135deg, #ec4899, #be185d)",
  width: 240,
  inputs: [
    { id: "a", label: "Stream A" },
    { id: "b", label: "Stream B" },
  ],
  outputs: [{ id: "merged", label: "merged" }],
  fields: [
    {
      id: "separator",
      type: "text",
      label: "Delimiter Token",
      defaultValue: " ",
      placeholder: "e.g. space, comma, tab…",
    },
    {
      id: "mode",
      type: "select",
      label: "Union Type",
      defaultValue: "concat",
      options: [
        { value: "concat", label: " Direct Concat" },
        { value: "join lines", label: " Line-by-Line Join" },
        { value: "JSON array", label: " Structural JSON Array" },
        { value: "JSON object", label: " Consolidated Key Mapping" },
      ],
    },
  ],
});
