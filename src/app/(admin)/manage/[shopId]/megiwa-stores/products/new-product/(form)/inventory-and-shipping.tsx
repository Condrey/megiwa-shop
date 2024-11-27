import { UpsertProductSchema } from "@/lib/validation";
import { InventoryStatus } from "@prisma/client";
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
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Switch,
} from "./default-imports";
import TooltipContainer from "./tooltip-container";

export interface InventoryAndShippingProps {
  form: UseFormReturn<UpsertProductSchema>;
}

export default function InventoryAndShipping({
  form,
}: InventoryAndShippingProps) {
  const InventoryStatusWithLabels: Record<InventoryStatus, string> = {
    IN_STOCK: "In Stock",
    OUT_OF_STOCK: "Out of Stock",
    PARTIALLY_OUT_OF_STOCK: "Partially Out of stock",
  };

  const isTrackingInventory = form.watch("stock.trackInventory");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory and shipping</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="stock.trackInventory"
            render={({ field }) => (
              <FormItem>
                {/*TODO: Handle wiping of data upon switch change  */}
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <TooltipContainer label="Track inventory">
                    {` Track this product's inventory by adding stock quantities per variant.`}
                  </TooltipContainer>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-3">
            {!isTrackingInventory && (
              <FormField
                control={form.control}
                name="stock.inventoryStatus"
                render={({ field }) => (
                  <FormItem className="basis-1/3">
                    <FormLabel>Status</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select status"
                            className="line-clamp-1"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Available statuses</SelectLabel>
                          {Object.entries(InventoryStatusWithLabels).map(
                            ([value, label]) => {
                              return (
                                <SelectItem value={value} key={value}>
                                  <span>{label}</span>
                                </SelectItem>
                              );
                            }
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {isTrackingInventory && (
              <FormField
                control={form.control}
                name="stock.quantity"
                render={({ field }) => (
                  <FormItem className="basis-1/3">
                    <FormLabel>Inventory</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem className="basis-1/3">
                  <TooltipContainer label="SKU">
                    A “Stock Keeping Unit” is a unique code you can create for
                    each product or variant you have in your store. Using SKUs
                    helps with tracking inventory.
                  </TooltipContainer>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="basis-1/3">
                  <TooltipContainer label="Shipping weight">
                    Enter the shipping weight of your product. You can use
                    decimals here (e.g., 0.9 kg or 1.34 lb).
                  </TooltipContainer>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
