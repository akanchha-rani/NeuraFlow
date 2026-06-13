import { cn } from "../../lib/utils";

export function Badge({ className, variant = "default", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-mono font-medium ring-1 ring-inset transition-colors",
        variant === "default" && "bg-primary/10 text-primary ring-primary/20",
        variant === "teal" && "bg-teal-500/10 text-teal-400 ring-teal-500/20",
        variant === "muted" && "bg-muted text-muted-foreground ring-border",
        className,
      )}
      {...props}
    />
  );
}
