import { cn } from "./lib/utils";
import { useStore } from "./store";

const colorMap = {
  customInput: "hover:border-sky-500/50 hover:bg-sky-500/5 hover:text-sky-400",
  customOutput:
    "hover:border-orange-500/50 hover:bg-orange-500/5 hover:text-orange-400",
  llm: "hover:border-violet-500/50 hover:bg-violet-500/5 hover:text-violet-400",
  text: "hover:border-teal-500/50 hover:bg-teal-500/5 hover:text-teal-400",
  apiCall: "hover:border-cyan-500/50 hover:bg-cyan-500/5 hover:text-cyan-400",
  condition:
    "hover:border-yellow-500/50 hover:bg-yellow-500/5 hover:text-yellow-400",
  transform:
    "hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:text-emerald-400",
  merge: "hover:border-pink-500/50 hover:bg-pink-500/5 hover:text-pink-400",
  note: "hover:border-slate-500/50 hover:bg-slate-500/5 hover:text-slate-400",
};

export const DraggableNode = ({ type, label, icon }) => {
  const addNode = useStore((state) => state.addNode);
  const getNodeID = useStore((state) => state.getNodeID);

  const onDragStart = (event, nodeType) => {
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType }),
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const onClick = () => {
    const nodeID = getNodeID(type);

    addNode({
      id: nodeID,
      type,
      position: {
        x: 250 + Math.random() * 150,
        y: 100 + Math.random() * 200,
      },
      data: {
        id: nodeID,
        nodeType: type,
      },
    });
  };

  return (
    <div
      draggable
      onClick={onClick}
      onDragStart={(e) => onDragStart(e, type)}
      onDragEnd={(e) => (e.target.style.cursor = "grab")}
      className={cn(
        "flex items-center gap-2.5 px-3 py-2 rounded-lg border border-border bg-secondary/40",
        "cursor-grab select-none transition-all duration-150",
        "text-muted-foreground text-sm font-medium",
        "hover:translate-x-0.5 active:scale-95 active:cursor-grabbing",
        colorMap[type],
      )}
    >
      <span className="text-base w-5 text-center">{icon}</span>
      <span>{label}</span>
    </div>
  );
};
