import { createNode } from "./BaseNode";
import { Globe } from "lucide-react";

export const ApiCallNode = createNode({
  label: "API Call",
  icon: <Globe size={16} />,
  gradient: "linear-gradient(135deg, #06b6d4, #0891b2)",
  width: 260,
  inputs: [
    { id: "url", label: "url" },
    { id: "body", label: "body" },
  ],
  outputs: [
    { id: "response", label: "response" },
    { id: "status", label: "status" },
  ],
  fields: [
    {
      id: "method",
      type: "select",
      label: "Method",
      defaultValue: "GET",
      options: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    },
    {
      id: "headers",
      type: "textarea",
      label: "Headers",
      placeholder: '{"Authorization":"Bearer ..."}',
    },
  ],
});
