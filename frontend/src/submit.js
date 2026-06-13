import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import {
  Play,
  Loader2,
  X,
  CheckCircle2,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import { useState } from "react";
import { cn } from "./lib/utils";

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(
          `Server responded with state status code: ${response.status}`,
        );
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={cn(
            "flex items-center gap-2.5 px-6 py-3 rounded-full font-sans transition-all duration-200 select-none",
            "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-xs font-semibold uppercase tracking-wider",
            "shadow-[0_4px_24px_rgba(99,102,241,0.35)]",
            "hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(99,102,241,0.5)] hover:from-indigo-400 hover:to-indigo-500",
            "active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
          )}
        >
          {loading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Play
              size={12}
              fill="currentColor"
              className="translate-x-[0.5px]"
            />
          )}
          {loading ? "Analyzing Graph…" : "Deploy Pipeline"}
        </button>
      </div>

      {result && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-150">
          <div className="bg-card/95 border border-border rounded-2xl shadow-2xl p-6 w-[380px] font-sans border-t-indigo-500/30 border-t-2">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <BarChart3 size={16} className="text-indigo-400" />
                <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">
                  Topology Summary
                </h2>
              </div>
              <button
                onClick={() => setResult(null)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-secondary"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between items-center py-1.5 border-b border-border/20">
                <span className="text-muted-foreground font-sans text-xs">
                  Active Nodes
                </span>
                <span className="text-foreground font-semibold bg-input px-2.5 py-0.5 rounded border border-border">
                  {result.num_nodes}
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-border/20">
                <span className="text-muted-foreground font-sans text-xs">
                  Graph Connections
                </span>
                <span className="text-foreground font-semibold bg-input px-2.5 py-0.5 rounded border border-border">
                  {result.num_edges}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground font-sans text-xs">
                  DAG Soundness
                </span>
                <span
                  className={cn(
                    "font-bold font-sans text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-md border",
                    result.is_dag
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20",
                  )}
                >
                  {result.is_dag ? "✓ Acyclic Valid" : "✕ Cycles Detected"}
                </span>
              </div>
            </div>

            <button
              onClick={() => setResult(null)}
              className="mt-5 w-full py-2.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-card border border-red-500/20 rounded-2xl shadow-2xl p-6 w-[380px] font-sans border-t-red-500/30 border-t-2">
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-border/60">
              <AlertCircle size={18} className="text-red-400" />
              <h2 className="text-sm font-bold text-red-400 uppercase tracking-wide">
                Pipeline Failure
              </h2>
            </div>
            <p className="text-xs text-secondary-foreground font-mono bg-input p-3 rounded-xl border border-border leading-relaxed mb-4">
              {error}
            </p>
            <button
              onClick={() => setError(null)}
              className="w-full py-2.5 rounded-xl bg-muted text-foreground hover:bg-muted/80 text-xs font-semibold uppercase tracking-wider border border-border transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </>
  );
};
