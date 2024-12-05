import { NumberInput } from "@/components/number-input/number-input";
import ResponsiveDrawer from "@/components/responsive-drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { ProductVariantSchema, productVariantSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Switch,
} from "../default-imports";
import TooltipContainer from "../tooltip-container";

const variantOptionSchema = productVariantSchema.extend({
  difference: z.number(),
});
const schema = z.object({
  options: z.array(variantOptionSchema),
});
type SchemaType = z.infer<typeof schema>;

interface EditVariantFormProps {
  productVariants: ProductVariantSchema[];
  originalPrice: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogEditVariantForm({
  productVariants,
  originalPrice,
  open,
  setOpen,
}: EditVariantFormProps) {
  const formattedProductVariants = productVariants.map((p) => ({
    ...p,
    difference: p.variant.priceData.price - originalPrice,
  }));

  const form2 = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: { options: formattedProductVariants },
  });
  const watchedOptions = form2.watch("options");
  // TODO:Create link for learning more
  return (
    <ResponsiveDrawer
      open={open}
      setOpen={setOpen}
      title="Product variants"
      description={
        <span>
          Based on your product options, these are the different versions of
          your product that customers can buy.{" "}
          <Link href={`#`} className="text-primary hover:underline">
            Learn more
          </Link>
        </span>
      }
      className="max-w-7xl"
    >
      <Form {...form2}>
        <form className="space-y-6">
          <div className="flex gap-4 justify-between items-center">
            <div className="ms-auto w-fit flex gap-3">
              <Checkbox
                checked={false}
                onCheckedChange={(value) => {
                  //handle on check cja=hanged
                }}
              />
              <TooltipContainer label="Track inventory">
                <p>
                  {`Track this product's inventory by`}{" "}
                  <strong className="font-semibold">
                    adding stock quantities per variant.
                  </strong>
                </p>
              </TooltipContainer>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>variant</TableHead>
                <TableHead>
                  <TooltipContainer label="Price difference (+/-)">
                    <p>
                      Enter the difference between the base product price and
                      the variant price{" "}
                      <strong className="font-semibold">
                        {`(e.g., to lower the price by UGX500,
                      enter -500).`}
                      </strong>
                    </p>
                  </TooltipContainer>
                </TableHead>
                <TableHead>Variant price</TableHead>
                <TableHead>
                  <TooltipContainer label="Cost of goods">
                    <p>
                      {`The amount you’re spending to produce and sell this
                      product.`}{" "}
                      <strong className="font-semibold">{`Your customers won’t see this.`}</strong>
                    </p>
                  </TooltipContainer>
                </TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead>Shipping weight</TableHead>
                <TableHead>Visible</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!!watchedOptions &&
                watchedOptions.map((variant, iteration) => (
                  <Variant
                    key={variant.id}
                    variant={variant}
                    form={form2}
                    iteration={iteration}
                  />
                ))}
            </TableBody>
          </Table>
        </form>
      </Form>
    </ResponsiveDrawer>
  );
}

interface VariantProps {
  variant: z.infer<typeof variantOptionSchema>;
  iteration: number;
  form: UseFormReturn<SchemaType>;
}
function Variant({ variant, form, iteration }: VariantProps) {
  const formattedChoices = Object.values(variant.choices).join(", ");
  const variantPrice = variant.variant.priceData.discountedPrice;
  const currency = variant.variant.priceData.currency;

  return (
    <TableRow>
      <TableCell>{formattedChoices} </TableCell>
      <TableCell>
        <FormField
          control={form.control}
          name={`options.${iteration}.difference`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <NumberInput prefix={currency} placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>{formatCurrency(variantPrice, currency)}</TableCell>
      <TableCell>
        <FormField
          control={form.control}
          name={`options.${iteration}.variant.costAndProfitData.itemCost`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <NumberInput prefix={currency} placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        <FormField
          control={form.control}
          name={`options.${iteration}.variant.sku`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="17240534586878" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        <FormField
          control={form.control}
          name={`options.${iteration}.stock.quantity`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <NumberInput placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        <FormField
          control={form.control}
          name={`options.${iteration}.variant.weight`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <NumberInput suffix="Kg" placeholder="0.0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>

      <TableCell>
        <FormField
          control={form.control}
          name={`options.${iteration}.variant.visible`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
    </TableRow>
  );
}
