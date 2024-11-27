import { UpsertProductSchema } from "@/lib/validation";
import { UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Switch,
} from "./default-imports";

interface VisibilitiesProps {
  form: UseFormReturn<UpsertProductSchema>;
}

export default function Visibilities({ form }: VisibilitiesProps) {
  // TODO: implement Show in Point of Sale
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visibilities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="visible"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-3 items-center">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel> Show in online store </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-3 items-center">
          <Switch />
          <FormLabel> Show in Point of Sale </FormLabel>
        </div>
      </CardContent>
    </Card>
  );
}
