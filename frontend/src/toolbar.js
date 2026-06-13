import { DraggableNode } from "./draggableNode";
import { Workflow, ChevronDown } from "lucide-react";
import {
  StickyNote,
  Bot,
  FileText,
  Upload,
  Download,
  GitMerge,
  Filter,
  RefreshCcw,
  Globe,
} from "lucide-react";

const NODE_GROUPS = [ 
  {
    label: "Input / Output",
    nodes: [
      {
        type: "customInput",
        label: "Input Trigger",
        icon: <Upload size={16} />,
      },
      {
        type: "customOutput",
        label: "Output Terminal",
        icon: <Download size={16} />,
      },
    ],
  },
  {
    label: "AI Models",
    nodes: [
      { type: "llm", label: "LLM Model", icon: <Bot size={16} /> },
      { type: "text", label: "Text Template", icon: <FileText size={16} /> },
    ],
  },
  {
    label: "Logic",
    nodes: [
      { type: "condition", label: "Condition", icon: <Filter size={16} />  },
      {
        type: "transform",
        label: "Data Transform",
        icon: <RefreshCcw size={16}  />,
      },
      { type: "merge", label: "Stream Merger", icon: <GitMerge size={16} /> },
    ],
  },
  {
    label: "Utilities",
    nodes: [
      { type: "apiCall", label: "API Webhook", icon: <Globe size={16} /> },
      { type: "note", label: "Sticky Note", icon: <StickyNote size={16} /> },
    ],
  },
];

export const PipelineToolbar = () => (
  <aside className="w-[240px] min-w-[240px] flex flex-col bg-card/40 backdrop-blur-xl border-r border-border/80 h-full select-none font-sans overflow-hidden">
    <div className="px-5 py-4 border-b border-border/60 flex flex-col gap-0.5 bg-card/60">
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-[0_2px_10px_rgba(99,102,241,0.3)]">
          <Workflow size={13} className="stroke-[2.5]" />
        </div>
        <span className="text-xs font-bold tracking-wider text-foreground uppercase font-sans">
          NeuraFlow
        </span>
      </div>
      <span className="text-[10px] text-muted-foreground/60 font-mono tracking-widest uppercase mt-1">
        Build. Connect. Execute.
      </span>
    </div>

    <div className="flex-1 p-4 space-y-5 overflow-y-auto custom-scrollbar bg-card/20">
      {NODE_GROUPS.map((group, gi) => (
        <div key={gi} className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60">
              {group.label}
            </span>
            <ChevronDown size={10} className="text-muted-foreground/30" />
          </div>
          <div className="flex flex-col gap-1.5">
            {group.nodes.map((n) => (
              <DraggableNode
                key={n.type}
                type={n.type}
                label={n.label}
                icon={n.icon}
              />
            ))}
          </div>
        </div>
      ))}
    </div>

    <div className="px-5 py-3.5 border-t border-border/40 bg-card/50 text-[10px] text-muted-foreground/40 font-mono text-center tracking-wide">
      Drag blocks onto canvas grid
    </div>
  </aside>
);
