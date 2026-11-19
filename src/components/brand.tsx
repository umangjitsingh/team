import { cn } from "cn";

export function BrandMark({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "text-2xl leading-none font-black tracking-tighter",
          inverted ? "text-white" : "text-foreground",
        )}
      >
        TP
        <span className="text-primary">+</span>
      </span>
      <span
        className={cn(
          "flex flex-col text-[11px] leading-tight font-extrabold tracking-[0.14em]",
          inverted ? "text-white" : "text-foreground",
        )}
      >
        TEAM PLUS
        <small
          className={cn(
            "text-[8px] font-semibold tracking-[0.22em]",
            inverted ? "text-white/70" : "text-muted-foreground",
          )}
        >
          CONSTRUCTION
        </small>
      </span>
    </span>
  );
}
