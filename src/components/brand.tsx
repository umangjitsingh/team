import {cn} from "cn";
import Image from 'next/image'

export function BrandMark({
                              className,
                              inverted = false,
                          }: {
    className?: string;
    inverted?: boolean;
}) {
    return (
        <span className={cn("inline-flex items-center gap-3 relative" , className)}>
     <Image
         src="/footer.png"
         alt="logo"
         width={40}
         height={40}

         className="saturate-75 rounded-sm w-auto h-auto"
     />
      <span
          className={cn(
              "flex flex-col text-[15px] leading-tight font-extrabold tracking-[0.17em]",
              inverted ? "text-white" : "text-foreground",
          )}
      >
        TEAM PLUS
        <small
            className={cn(
                "text-[9px] font-semibold tracking-[0.27em]",
                inverted ? "text-white/70" : "text-muted-foreground",
            )}
        >
          CONSTRUCTION
        </small>
      </span>
    </span>
    );
}
