import { FormDescription } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
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
  Input,
} from "./default-imports";

interface PricingProps {
  form: UseFormReturn<UpsertProductSchema>;
}

export default function Pricing({ form }: PricingProps) {
  function handleOnSaleSwitch() {}
  function handleShowPricePerUnitSwitch() {}
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
      </CardHeader>
      <CardContent className="flex-col gap-6 w-full">
        {/* TODO: get currency from cookie session */}
        <div className="flex  w-full">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="basis-1/3">
                <FormLabel>price</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="USh" type="number" />
                </FormControl>
                <FormDescription />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="onSaleSwitch" />
          <Label htmlFor="onSaleSwitch">On sale</Label>
        </div>
      </CardContent>
    </Card>
  );
}
