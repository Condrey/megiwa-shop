import { UpsertProductSchema } from "@/lib/validation";
import { MonitorCogIcon, PuzzleIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./default-imports";

interface MarketingAndSeoProps {
  form: UseFormReturn<UpsertProductSchema>;
}

export default function MarketingAndSeo({ form }: MarketingAndSeoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketing and SEO</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 items-start">
        <Button type="button" variant={"ghost"}>
          <PuzzleIcon className="mr-2 " />
          <span>Create Coupon</span>
        </Button>
        <Button type="button" variant={"ghost"}>
          <MonitorCogIcon className="mr-2 " />
          <span>Edit SEO settings</span>
        </Button>
      </CardContent>
    </Card>
  );
}
