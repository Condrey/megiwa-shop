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
import {
  ProductVariantSchema,
  productVariantSchema,
  UpsertProductSchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "../default-imports";
import FormTooltipContainer from "./form-tooltip-container";

const variantOptionSchema = productVariantSchema.extend({
  difference: z.number(),
});
const schema = z.object({
  options: z.array(variantOptionSchema),
  trackInventory: z.boolean().default(false),
});
type SchemaType = z.infer<typeof schema>;

interface EditVariantFormProps {
  form: UseFormReturn<UpsertProductSchema>;
  productVariants: ProductVariantSchema[];
  originalPrice: number;
  originalDiscountedPrice: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogEditVariantForm({
  form,
  originalPrice,
  originalDiscountedPrice,
  productVariants,
  open,
  setOpen,
}: EditVariantFormProps) {
  const trackInventory = form.watch("stock.trackInventory");
  const variantsUseFieldArray = useFieldArray({
    control: form.control,
    name: "variants",
  });
  const formattedProductVariants = productVariants.map((p) => ({
    ...p,
    difference: p.variant.priceData.price - originalDiscountedPrice,
  }));

  const form2 = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      options: formattedProductVariants,
      trackInventory,
    },
  });
  useEffect(() => {
    const formattedProductVariants = productVariants.map((p) => ({
      ...p,
      difference: p.variant.priceData.price - originalDiscountedPrice,
    }));
    form2.reset({ options: formattedProductVariants, trackInventory });
  }, [productVariants, originalDiscountedPrice, form2, trackInventory]);

  const watchedOptions = form2.watch("options");
  const watchedTrackInventory = form2.watch("trackInventory");
  const optionsUseFieldArray = useFieldArray({
    control: form2.control,
    name: "options",
  });

  const Tooltips = {
    inventoryTooltip: (
      <FormTooltipContainer label="Track inventory">
        <p>
          {`Track this product's inventory by`}{" "}
          <strong className="font-semibold">
            adding stock quantities per variant.
          </strong>
        </p>
      </FormTooltipContainer>
    ),
    priceDifference: (
      <FormTooltipContainer label="Price difference (+/-)">
        <p>
          Enter the difference between the base product price and the variant
          price{" "}
          <strong className="font-semibold">
            {`(e.g., to lower the price by UGX500,
                      enter -500).`}
          </strong>
        </p>
      </FormTooltipContainer>
    ),
    costOfGoods: (
      <FormTooltipContainer label="Cost of goods">
        <p>
          {`The amount you’re spending to produce and sell this
                      product.`}{" "}
          <strong className="font-semibold">{`Your customers won’t see this.`}</strong>
        </p>
      </FormTooltipContainer>
    ),
  };

  function handleSubmit(input: SchemaType) {
    variantsUseFieldArray.replace(input.options as ProductVariantSchema[]);
    setOpen(false);
  }

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
            <FormField
              control={form2.control}
              name="trackInventory"
              render={({ field }) => (
                <FormItem className="ms-auto w-fit">
                  <FormControl>
                    <div className=" flex gap-3">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(value) => {
                          const newOptions = watchedOptions.map((option) => ({
                            ...option,
                            stock: {
                              ...option.stock,
                              trackQuantity: value as boolean,
                              inStock: !(value as boolean),
                            },
                          }));
                          optionsUseFieldArray.replace(newOptions);
                          form.setValue(
                            "stock.trackInventory",
                            value as boolean
                          );
                          field.onChange(value);
                        }}
                      />
                      {Tooltips.inventoryTooltip}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>variant</TableHead>
                <TableHead>{Tooltips.priceDifference}</TableHead>
                <TableHead>Variant price</TableHead>
                <TableHead>{Tooltips.costOfGoods}</TableHead>
                <TableHead>SKU</TableHead>
                {!!watchedTrackInventory && watchedTrackInventory ? (
                  <TableHead>Inventory</TableHead>
                ) : (
                  <TableHead>Status</TableHead>
                )}
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
                    trackInventory={watchedTrackInventory}
                    originalPrice={originalPrice}
                    originalDiscountedPrice={originalDiscountedPrice}
                  />
                ))}
            </TableBody>
          </Table>
          <div className="flex justify-end items-center gap-4">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => {
                // form2.reset({ trackInventory: false, options: [] });
                setOpen(false);
              }}
            >
              cancel
            </Button>
            <Button
              type="button"
              disabled={!form2.formState.isDirty}
              onClick={() => form2.handleSubmit(handleSubmit)()}
            >
              Apply
            </Button>
          </div>
        </form>
      </Form>
    </ResponsiveDrawer>
  );
}

interface VariantProps {
  variant: z.infer<typeof variantOptionSchema>;
  iteration: number;
  form: UseFormReturn<SchemaType>;
  trackInventory: boolean;
  originalPrice: number;
  originalDiscountedPrice: number;
}
function Variant({
  variant,
  form,
  iteration,
  trackInventory,
  originalPrice,
  originalDiscountedPrice,
}: VariantProps) {
  const formattedChoices = Object.values(variant.choices).join(", ");
  const variantPrice = variant.variant.priceData.discountedPrice;
  const currency = variant.variant.priceData.currency;
  variant.variant.priceData;

  function updateProfitsCostOfGoodArbitrarily(costOfGood?: number) {
    const watchedCostOfGood = form.watch(
      `options.${iteration}.variant.costAndProfitData.itemCost`
    );
    const amount = form.watch(
      `options.${iteration}.variant.priceData.discountedPrice`
    );
    const parsedCostOfGood = Number(costOfGood || watchedCostOfGood);
    const parsedAmount = Number(amount);
    if (isNaN(parsedCostOfGood) || parsedCostOfGood === 0) {
      form.setValue(
        `options.${iteration}.variant.costAndProfitData.profit`,
        parsedAmount
      );
      form.setValue(
        `options.${iteration}.variant.costAndProfitData.profitMargin`,
        100
      );
    } else {
      const profit = parsedAmount - parsedCostOfGood;
      form.setValue(
        `options.${iteration}.variant.costAndProfitData.profit`,
        profit
      );
      form.setValue(
        `options.${iteration}.variant.costAndProfitData.profitMargin`,
        parseFloat(((profit / parsedAmount) * 100).toFixed(2))
      );
    }
  }

  function updateDiscountPriceArbitrarily(difference: number) {
    const parsedAmount = Number(originalPrice);
    const parsedDiscount = Number(originalDiscountedPrice);
    if (isNaN(difference) || difference === 0) {
      return;
    }
    form.setValue(
      `options.${iteration}.variant.priceData.discountedPrice`,
      difference + parsedDiscount
    );
    form.setValue(
      `options.${iteration}.variant.priceData.price`,
      difference + parsedAmount
    );

    updateProfitsCostOfGoodArbitrarily();
  }

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
                <NumberInput
                  prefix={currency}
                  placeholder="0"
                  {...field}
                  postChange={updateDiscountPriceArbitrarily}
                />
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
                <NumberInput
                  prefix={currency}
                  placeholder="0"
                  {...field}
                  postChange={updateProfitsCostOfGoodArbitrarily}
                />
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
      {trackInventory ? (
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
      ) : (
        <TableCell>
          <FormField
            control={form.control}
            name={`options.${iteration}.stock.inStock`}
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(value) => field.onChange(JSON.parse(value))}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a value" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"true"}>In stock</SelectItem>
                    <SelectItem value={"false"}>Out of stock</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </TableCell>
      )}
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
