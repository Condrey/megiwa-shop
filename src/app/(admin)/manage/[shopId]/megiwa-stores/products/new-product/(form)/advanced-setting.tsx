import { UpsertProductSchema } from "@/lib/validation";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FormControl,
  FormField,
  FormItem,
  Input,
} from "./default-imports";
import TooltipContainer from "./tooltip-container";

interface AdvancedSettingProps {
  form: UseFormReturn<UpsertProductSchema>;
}

export default function AdvancedSetting({ form }: AdvancedSettingProps) {
  // TODO: implement page for brand
  // TODO: add other fields from wix
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <TooltipContainer label="Brand">
                <span>
                  {`Including a brand name can help improve your site’s visibility
                  on search engines.`}
                </span>{" "}
                <Link href={`#`} className="text-primary hover:underline">
                  Learn more
                </Link>
              </TooltipContainer>
              <FormControl>
                <Input placeholder="Start typing a brand name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
