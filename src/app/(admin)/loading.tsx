import { CardDescription, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col  gap-4  size-full items-center justify-center">
      <CardTitle>Megiwa Shoppers</CardTitle>
      <Loader2 className="mx-auto animate-spin" />
      <CardDescription>Loading your dashboard</CardDescription>
    </div>
  );
}
