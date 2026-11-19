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
          "flex flex-col text-sm leading-tight font-extrabold tracking-[0.14em]",
          inverted ? "text-white" : "text-foreground",
        )}
      >
        TEAM PLUS
        <small
          className={cn(
            "text-[9px] font-semibold tracking-[0.22em]",
            inverted ? "text-white/70" : "text-muted-foreground",
          )}
        >
          CONSTRUCTION
        </small>
      </span>
    </span>
  );
}
