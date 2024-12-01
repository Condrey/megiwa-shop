import { UpsertProductSchema } from "@/lib/validation";
import { DiscountEnumType } from "@prisma/client";
import { PercentIcon } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { NumberInput } from "../../../../../../../../components/number-input/number-input";
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
  groupedUnits,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Switch,
  ToggleGroup,
  ToggleGroupItem,
} from "./default-imports";
import TooltipContainer from "./tooltip-container";

interface PricingProps {
  form: UseFormReturn<UpsertProductSchema>;
}

export default function Pricing({ form }: PricingProps) {
  const currency = "USh";
  const [onSaleSwitched, setOnSaleSwitched] = useState(false);
  const [onShowPricePerUnitClicked, setOnShowPricePerUnitClicked] =
    useState(false);
  const watchedDiscountType = form.watch("discount.type");
  function handleOnSaleSwitch(checked: boolean) {
    setOnSaleSwitched(checked);
  }
  function handleShowPricePerUnitSwitch(checked: boolean) {
    setOnShowPricePerUnitClicked(checked);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
      </CardHeader>
      <CardContent className="flex-col flex gap-6 w-full">
        {/* TODO: get currency from cookie session */}
        <div className="flex  w-full">
          <FormField
            control={form.control}
            name="priceData.price"
            render={({ field }) => (
              <FormItem className="basis-1/3">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <NumberInput prefix={currency} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="onSaleSwitch"
              checked={onSaleSwitched}
              onCheckedChange={handleOnSaleSwitch}
            />
            <Label htmlFor="onSaleSwitch">On sale</Label>
          </div>
          {onSaleSwitched && (
            <div className="flex gap-4">
              {/* TODO: Implement the 2 toggles  */}
              <FormField
                control={form.control}
                name="discount.value"
                render={({ field }) => (
                  <FormItem className="basis-1/3">
                    <FormLabel>
                      {`Discount ${
                        watchedDiscountType === "PERCENT"
                          ? "Percentage"
                          : "Amount"
                      }`}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <NumberInput
                          placeholder={"0"}
                          className="pe-[6.5rem]"
                          min={0}
                          max={
                            watchedDiscountType === "PERCENT" ? 100 : undefined
                          }
                          {...field}
                        />

                        <div className="absolute right-0 top-1/2 border-l -translate-y-1/2">
                          <FormField
                            control={form.control}
                            name="discount.type"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <ToggleGroup
                                    type="single"
                                    value={field.value}
                                    onValueChange={(value) =>
                                      field.onChange(value)
                                    }
                                  >
                                    {Object.values(DiscountEnumType).map(
                                      (type) => (
                                        <ToggleGroupItem
                                          key={type}
                                          value={type}
                                          aria-label={type}
                                        >
                                          {type === "AMOUNT" ? (
                                            currency
                                          ) : (
                                            <PercentIcon />
                                          )}
                                        </ToggleGroupItem>
                                      )
                                    )}
                                  </ToggleGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priceData.discountedPrice"
                render={({ field }) => (
                  <FormItem className="basis-1/3">
                    <FormLabel>Sale price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <NumberInput className=" ps-12" {...field} />
                        <span className="absolute  left-2 top-1/2 -translate-y-1/2">
                          {currency}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="onShowPricePerUnitSwitch"
              checked={onShowPricePerUnitClicked}
              onCheckedChange={handleShowPricePerUnitSwitch}
            />
            <div className="flex  items-center">
              <Label htmlFor="onShowPricePerUnitSwitch">
                Show price per unit
              </Label>
              <TooltipContainer label="">
                Let customers see prices based on fixed measurement units, e.g.,
                price per 100 grams of cheese.
              </TooltipContainer>
            </div>
          </div>
          {onShowPricePerUnitClicked && (
            <div className="flex gap-4">
              <div className="basis-1/3 flex flex-col gap-2">
                <div className="flex items-center">
                  <span className="line-clamp-1">
                    Total product quantity in units
                  </span>
                  <TooltipContainer label="">
                    Set your product’s total quantity in units, e.g., if your
                    product weighs 100 grams and the unit is grams, then the
                    quantity is 100.
                  </TooltipContainer>
                </div>
                <div className=" gap-4 grid grid-cols-2">
                  <FormField
                    control={form.control}
                    name="pricePerUnitData.totalQuantity"
                    render={({ field }) => (
                      <FormItem className="basis-1/3">
                        <FormControl>
                          <NumberInput placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pricePerUnitData.totalMeasurementUnit"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="max-w-[280px]">
                              <SelectValue placeholder="Select a unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(groupedUnits).map(
                              ([group, units]) => (
                                <SelectGroup key={group}>
                                  <SelectLabel>{group}</SelectLabel>
                                  {units.map((unit) => (
                                    <SelectItem
                                      key={unit.unit}
                                      value={unit.unit}
                                    >
                                      {`${unit.label} (${unit.abbreviation})`}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="basis-1/3 flex flex-col gap-2">
                <div className="flex items-center">
                  <span className="line-clamp-1">Base units</span>
                  <TooltipContainer label="">
                    Set your product’s unit of measurement to calculate the base
                    price, e.g., for a product weighing 1 kilo, you may set the
                    base units to 100 g.
                  </TooltipContainer>
                </div>
                <div className=" gap-4 grid grid-cols-2">
                  <FormField
                    control={form.control}
                    name="pricePerUnitData.baseQuality"
                    render={({ field }) => (
                      <FormItem className="basis-1/3">
                        <FormControl>
                          <NumberInput placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pricePerUnitData.baseMeasurementUnit"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="max-w-[280px]">
                              <SelectValue placeholder="Select a unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(groupedUnits).map(
                              ([group, units]) => (
                                <SelectGroup key={group}>
                                  <SelectLabel>{group}</SelectLabel>
                                  {units.map((unit) => (
                                    <SelectItem
                                      key={unit.unit}
                                      value={unit.unit}
                                    >
                                      {`${unit.label} (${unit.abbreviation})`}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-4">
          {/* TODO: make the automatic calculations for profits  */}
          <FormField
            control={form.control}
            name="costAndProfitData.itemCost"
            render={({ field }) => (
              <FormItem className="basis-1/3">
                <TooltipContainer label="Cost of goods">
                  The amount you’re spending to produce and sell this product.
                  Your customers won’t see this.{" "}
                </TooltipContainer>
                <FormControl>
                  <NumberInput prefix={currency} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="costAndProfitData.profit"
            render={({ field }) => (
              <FormItem className="basis-1/3">
                <TooltipContainer label="Profit">
                  The price of the product minus your cost of goods.
                </TooltipContainer>
                <FormControl>
                  <NumberInput prefix={currency} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="costAndProfitData.profitMargin"
            render={({ field }) => (
              <FormItem className="basis-1/3">
                <TooltipContainer label="Margin">
                  The percentage of the price that’s left after deducting your
                  cost of goods.
                </TooltipContainer>
                <FormControl>
                  <div className="relative">
                    <NumberInput className=" pe-12" {...field} />
                    <span className="absolute  right-2 top-1/2 -translate-y-1/2">
                      <PercentIcon className="size-5" />
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
