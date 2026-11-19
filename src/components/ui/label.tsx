import { cn } from "cn";
import type { ComponentProps } from "react";

function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    // Callers pass htmlFor so the label is tied to its input.
    // biome-ignore lint/a11y/noLabelWithoutControl: htmlFor is supplied by the caller
    <label
      data-slot="label"
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    />
  );
}

export { Label };
