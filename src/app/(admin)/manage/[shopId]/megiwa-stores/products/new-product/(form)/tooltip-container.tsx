import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import {
  Label,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./default-imports";

interface TooltipContainerProps {
  children: React.ReactNode;
  className?: string;
  label: string;
}

export default function TooltipContainer({
  label,
  children,
  className,
}: TooltipContainerProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          type="button"
          className="flex gap-2 justify-start h-fit items-center"
        >
          <Label className="line-clamp-1 pb-1">{label}</Label>
          <InfoIcon className="size-5 text-primary mb-1" />
        </TooltipTrigger>
        <TooltipContent className={cn("max-w-xs flex p-4 z-50", className)}>
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
