import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-dvh gap-4  size-full items-center justify-center">
      <Loader2 className="mx-auto my-16 animate-spin" />
    </div>
  );
}
