import { createNode } from "./BaseNode";
import { Bot } from "lucide-react";

export const LLMNode = createNode({
  label: "LLM Orchestrator",
  icon: <Bot size={16} />,
  gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
  width: 250,
  inputs: [
    { id: "system", label: "system" },
    { id: "prompt", label: "prompt" },
  ],
  outputs: [{ id: "response", label: "response" }],
  fields: [
    {
      id: "model",
      type: "select",
      label: "Model",
      defaultValue: "gpt-4o",
      options: [
        "gpt-4o",
        "gpt-4-turbo",
        "gpt-3.5-turbo",
        "claude-3-5-sonnet",
        "claude-3-haiku",
      ],
    },
  ],
});
