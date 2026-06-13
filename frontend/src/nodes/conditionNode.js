import { createNode } from "./BaseNode";
import { Filter } from "lucide-react";

export const ConditionNode = createNode({
  label: "Condition",
  icon: <Filter size={16} />,
  gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
  width: 250,
  inputs: [{ id: "value", label: "value" }],
  outputs: [
    { id: "true", label: "true" },
    { id: "false", label: "false" },
  ],
  fields: [
    {
      id: "operator",
      type: "select",
      label: "Operator",
      defaultValue: "equals",
      options: [
        { value: "equals", label: " equals" },
        { value: "not_equals", label: " not equals" },
        { value: "greater", label: " greater" },
        { value: "less", label: " less" },
        { value: "contains", label: " contains" },
      ],
    },
    {
      id: "compareValue",
      type: "text",
      label: "Compare to",
      placeholder: "value…",
    },
  ],
});
