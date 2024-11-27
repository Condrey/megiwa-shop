import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import {
  FormLabel,
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
        <TooltipTrigger type="button">
          <div className="flex gap-2 items-center">
            <FormLabel>{label}</FormLabel>
            <InfoIcon className="size-6 text-primary" />
          </div>
        </TooltipTrigger>
        <TooltipContent className={cn("max-w-xs p-4", className)}>
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
