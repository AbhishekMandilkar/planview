import { cn } from "@planview/ui/lib/utils";
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";

import { isDesktop, toggleWindowZoom } from "@/lib/desktop";

type TitleBarStripProps = {
  children?: ReactNode;
  borderClassName?: string;
  dense?: boolean;
} & Omit<ComponentPropsWithoutRef<"header">, "children">;

export function TitleBarStrip({
  children,
  className,
  borderClassName,
  dense = true,
  ...props
}: TitleBarStripProps) {
  const handleDoubleClick = (event: MouseEvent<HTMLElement>) => {
    if (isDesktop()) {
      void toggleWindowZoom();
    }
    props.onDoubleClick?.(event);
  };

  return (
    <header
      {...props}
      className={cn(
        "electrobun-webkit-app-region-drag flex shrink-0 items-center border-b px-4",
        dense ? "h-11" : "min-h-11 py-2",
        borderClassName ?? "border-border",
        className,
      )}
      onDoubleClick={handleDoubleClick}
    >
      {children}
    </header>
  );
}
