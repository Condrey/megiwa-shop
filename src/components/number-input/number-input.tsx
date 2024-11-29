import { Input } from "@/components/ui/input"; // Adjust the path as needed
import { cn } from "@/lib/utils";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import "./style.css";

interface NumberInputProps<T extends FieldValues>
  extends UseControllerProps<T> {
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  placeholder?: string;
  prefix?: string;
}

export function NumberInput<T extends FieldValues>({
  min = 0,
  max,
  step = 1,
  className = "",
  placeholder = "Enter a number",
  prefix,
  ...props
}: NumberInputProps<T>) {
  const { field } = useController(props);

  return (
    <div className="relative">
      {prefix && (
        <span className="absolute text-muted-foreground left-2 top-1/2 -translate-y-1/2">
          {prefix}
        </span>
      )}
      <Input
        type="number"
        min={min}
        max={max}
        step={step}
        className={cn(`ps-${prefix ? 12 : 4}`, "no-caret", className)}
        placeholder={placeholder}
        value={field.value ?? ""}
        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
        onBlur={field.onBlur}
        name={field.name}
        ref={field.ref}
      />
    </div>
  );
}
