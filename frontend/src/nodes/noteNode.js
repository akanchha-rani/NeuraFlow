import { createNode } from "./BaseNode";
import { StickyNote } from "lucide-react";

export const NoteNode = createNode({
  label: "Sticky Note",
  icon: <StickyNote size={16} />,
  gradient: "linear-gradient(135deg, #64748b, #475569)",
  width: 240,
  inputs: [],
  outputs: [],
  fields: [
    {
      id: "note",
      type: "textarea",
      label: "Memo Content",
      defaultValue: "",
      placeholder: "Write down instructions or context here…",
      rows: 4,
    },
    {
      id: "color",
      type: "select",
      label: "Visual Tint",
      defaultValue: "yellow",
      options: [
        { value: "yellow", label: " Amber Note" },
        { value: "blue", label: " Sapphire Note" },
        { value: "green", label: " Emerald Note" },
        { value: "red", label: " Ruby Note" },
        { value: "purple", label: " Amethyst Note" },
      ],
    },
  ],
});
