import { useState, useEffect, useRef, useCallback } from "react";
import { Handle, Position } from "reactflow";
import { cn } from "../lib/utils";
import { X } from "lucide-react";
import { useStore } from "../store";
import {FileText} from "lucide-react";

const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

function extractVars(text) {
  const seen = new Set();
  let m;
  VAR_REGEX.lastIndex = 0;
  while ((m = VAR_REGEX.exec(text)) !== null) seen.add(m[1]);
  return Array.from(seen);
}

export const TextNode = ({ id, data }) => {
  const deleteNode = useStore((state) => state.deleteNode);
  const [text, setText] = useState(data?.text || "{{input}}");
  const [vars, setVars] = useState(() =>
    extractVars(data?.text || "{{input}}"),
  );
  const [width, setWidth] = useState(260);
  const textareaRef = useRef(null);
  const mirrorRef = useRef(null);

  useEffect(() => {
    setVars(extractVars(text));
  }, [text]);

  const resize = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.max(64, ta.scrollHeight) + "px";

    const mirror = mirrorRef.current;
    if (mirror) {
      const longest = text
        .split("\n")
        .reduce((a, b) => (b.length > a.length ? b : a), "");
      mirror.textContent = longest + "---";
      const computedWidth = Math.min(
        Math.max(260, mirror.scrollWidth + 32),
        480,
      );
      setWidth(computedWidth);
    }
  }, [text]);

  useEffect(() => {
    resize();
  }, [text, resize]);

  const varHandleTop = (index, total) => {
    if (total === 1) return "50%";
    return `${20 + (index * 60) / (total - 1)}%`;
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card/85 backdrop-blur-xl overflow-hidden font-sans",
        "shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)] react-flow-node-container",
      )}
      style={{ width }}
    >
    
      <div
        ref={mirrorRef}
        className="absolute invisible whitespace-pre px-3 py-2 text-xs font-mono"
        style={{ pointerEvents: "none" }}
      />

      <div className="relative overflow-hidden border-b border-border/80 px-4 py-3">
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-teal-500 to-emerald-600 opacity-90" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-base select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              <FileText size={16} />
            </span>

            <div className="flex flex-col">
              <span className="text-xs font-semibold text-foreground tracking-wide">
                Text Template
              </span>

              <span className="text-[9px] font-mono font-medium text-muted-foreground/60 tracking-wider lowercase">
                {id}
              </span>
            </div>
          </div>

          <button
            onClick={() => deleteNode(id)}
            className="
      h-6
      w-6
      rounded-md
      flex
      items-center
      justify-center
      text-muted-foreground
      hover:text-red-400
      hover:bg-red-500/10
      transition-all
      duration-150
    "
            title="Delete Node"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4 border-b border-border/30 bg-secondary/10">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80 font-mono">
            Template Content
          </label>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type variables using {{param_name}}..."
            className={cn(
              "w-full rounded-lg border border-border bg-input/40 px-3 py-2 text-xs text-foreground font-mono leading-relaxed",
              "placeholder:text-muted-foreground/40 focus:outline-none focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/40 transition-all custom-scrollbar",
            )}
            style={{ minHeight: "64px" }}
          />
        </div>

        {vars.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {vars.map((v) => (
              <span
                key={v}
                className="inline-flex items-center rounded bg-teal-500/10 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-teal-400 border border-teal-500/20"
              >
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between items-start px-4 py-3 bg-secondary/20 min-h-[44px]">
        <div className="flex flex-col gap-2">
          {vars.map((v) => (
            <div key={v} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
              <span className="text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                {v}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 items-end ml-auto">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-wider">
              output
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          </div>
        </div>
      </div>

      {vars.map((v, i) => (
        <Handle
          key={v}
          type="target"
          position={Position.Left}
          id={`${id}-${v}`}
          style={{ top: varHandleTop(i, vars.length) }}
          className="flow-handle flow-handle-input"
        />
      ))}

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: "50%" }}
        className="flow-handle flow-handle-output"
      />
    </div>
  );
};
