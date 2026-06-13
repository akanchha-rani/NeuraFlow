import { useState } from "react";
import { Handle, Position } from "reactflow";
import { cn } from "../lib/utils";
import { useStore } from "../store";
import { X } from "lucide-react";

function handleTop(index, total) {
  if (total === 1) return "50%";
  return `${20 + (index * 60) / (total - 1)}%`;
}

const fieldBase =
  "w-full rounded-lg border border-border bg-input/40 px-3 py-2 text-xs text-foreground font-sans placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all duration-150 shadow-inner";

function TextField({ field, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80 font-mono">
        {field.label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder || ""}
        className={fieldBase}
      />
    </div>
  );
}

function SelectField({ field, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80 font-mono">
        {field.label}
      </label>
      <div className="relative w-full">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            fieldBase,
            "cursor-pointer appearance-none pr-8 bg-no-repeat w-full",
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
            backgroundPosition: "right 10px center",
          }}
        >
          {(field.options || []).map((o) => {
            const val = typeof o === "string" ? o : o.value;
            const lbl = typeof o === "string" ? o : o.label;
            return (
              <option
                key={val}
                value={val}
                className="bg-[#0b0f19] text-foreground py-1.5"
              >
                {lbl}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

function TextareaField({ field, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80 font-mono">
        {field.label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder || ""}
        rows={field.rows || 3}
        className={cn(
          fieldBase,
          "resize-y min-h-[60px] leading-normal custom-scrollbar",
        )}
      />
    </div>
  );
}

function NumberField({ field, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80 font-mono">
        {field.label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={field.min}
        max={field.max}
        step={field.step || 1}
        className={fieldBase}
      />
    </div>
  );
}

function ToggleField({ field, value, onChange }) {
  return (
    <div className="flex items-center justify-between py-1">
      <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80 font-mono">
        {field.label}
      </label>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 focus:outline-none",
          value ? "bg-indigo-500" : "bg-muted-foreground/20",
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ease-in-out mt-[1px]",
            value ? "translate-x-4" : "translate-x-0.5",
          )}
        />
      </button>
    </div>
  );
}

function FieldRenderer({ field, value, onChange }) {
  switch (field.type) {
    case "select":
      return <SelectField field={field} value={value} onChange={onChange} />;
    case "textarea":
      return <TextareaField field={field} value={value} onChange={onChange} />;
    case "number":
      return <NumberField field={field} value={value} onChange={onChange} />;
    case "toggle":
      return <ToggleField field={field} value={value} onChange={onChange} />;
    default:
      return <TextField field={field} value={value} onChange={onChange} />;
  }
}

function BaseNodeRenderer({ id, config }) {
  const {
    label = "Node",
    icon = "",
    gradient = "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    width = 260,
    inputs = [],
    outputs = [],
    fields = [],
  } = config;
  const deleteNode = useStore((state) => state.deleteNode);
  const updateNodeField = useStore((state) => state.updateNodeField);
  const nodeState = useStore(
    (state) => state.nodes.find((n) => n.id === id),
    (a, b) => JSON.stringify(a?.data) === JSON.stringify(b?.data),
  );

  const handleFieldChange = (fieldId, val) => {
    updateNodeField(id, fieldId, val);
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card/85 backdrop-blur-xl overflow-hidden font-sans",
        "shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)] react-flow-node-container",
      )}
      style={{ width }}
    >
      <div className="relative overflow-hidden border-b border-border/80 px-4 py-3">
        <div
          className="absolute top-0 left-0 right-0 h-[2.5px] opacity-90"
          style={{ background: gradient }}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {icon && (
              <span className="text-base select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                {icon}
              </span>
            )}

            <div className="flex flex-col">
              <span className="text-xs font-semibold text-foreground tracking-wide font-sans">
                {label}
              </span>

              <span className="text-[9px] font-mono font-medium text-muted-foreground/60 tracking-wider lowercase">
                {id}
              </span>
            </div>
          </div>

          <button
            onClick={() => deleteNode(id)}
            className="h-6 w-6 rounded-md flex items-center justify-center  text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
            title="Delete Node"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {fields.length > 0 && (
        <div className="flex flex-col gap-4 p-4 border-b border-border/30 bg-secondary/10">
          {fields.map((field) => {
            const currentValue =
              nodeState?.data?.[field.id] ?? field.defaultValue ?? "";
            return (
              <FieldRenderer
                key={field.id}
                field={field}
                value={currentValue}
                onChange={(val) => handleFieldChange(field.id, val)}
              />
            );
          })}
        </div>
      )}

      {(inputs.length > 0 || outputs.length > 0) && (
        <div className="flex justify-between items-start px-4 py-3 bg-secondary/20 min-h-[44px]">
          <div className="flex flex-col gap-2">
            {inputs.map((h) => (
              <div
                key={h.id}
                className="flex items-center gap-2 animate-fade-in"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
                <span className="text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                  {h.label}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 items-end ml-auto">
            {outputs.map((h) => (
              <div
                key={h.id}
                className="flex items-center gap-2 animate-fade-in"
              >
                <span className="text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                  {h.label}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              </div>
            ))}
          </div>
        </div>
      )}

      {inputs.map((h, i) => (
        <Handle
          key={h.id}
          type="target"
          position={Position.Left}
          id={`${id}-${h.id}`}
          style={{ top: handleTop(i, inputs.length) }}
          className="flow-handle flow-handle-input"
        />
      ))}

      {outputs.map((h, i) => (
        <Handle
          key={h.id}
          type="source"
          position={Position.Right}
          id={`${id}-${h.id}`}
          style={{ top: handleTop(i, outputs.length) }}
          className="flow-handle flow-handle-output"
        />
      ))}
    </div>
  );
}

export function createNode(config) {
  const Component = ({ id, data }) => (
    <BaseNodeRenderer id={id} data={data} config={config} />
  );
  Component.displayName = config.label + "Node";
  return Component;
}

export { BaseNodeRenderer };
