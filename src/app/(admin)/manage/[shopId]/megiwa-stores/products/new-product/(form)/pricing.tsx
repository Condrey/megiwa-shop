import { UpsertProductSchema } from "@/lib/validation";
import { convertUnits, getUnitGroup } from "@/utils/unit-conversion";
import { DiscountEnumType, MeasurementEnumUnit } from "@prisma/client";
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
  const [basePricePerUnit, setBasePricePerUnit] = useState<string>("");
  const [onSaleSwitched, setOnSaleSwitched] = useState(false);
  const [onShowPricePerUnitClicked, setOnShowPricePerUnitClicked] =
    useState(false);

  const watchedDiscountType = form.watch("discount.type");
  function handleOnSaleSwitch(checked: boolean) {
    if (!checked) {
      form.setValue("discount.value", 0);
      form.setValue("priceData.discountedPrice", 0);
    }
    setOnSaleSwitched(checked);
  }
  function handleShowPricePerUnitSwitch(checked: boolean) {
    setOnShowPricePerUnitClicked(checked);
  }

  function updateSalePriceDependantArbitrarily(salePrice: number) {
    const amount = form.watch("priceData.price");
    const parsedAmount = Number(amount);

    if (isNaN(salePrice) || salePrice <= 0) {
      form.setValue("priceData.discountedPrice", 0);
    }
    if (watchedDiscountType === "PERCENT" && salePrice >= 0) {
      form.setValue(
        "discount.value",
        ((parsedAmount - salePrice) / parsedAmount) * 100
      );
    } else if (watchedDiscountType === "AMOUNT" && salePrice >= 0) {
      form.setValue("discount.value", parsedAmount - salePrice);
    }
    updateProfitsCostOfGoodArbitrarily();
    calculateBasePricePerUnit();
  }

  function updateProfitsCostOfGoodArbitrarily(costOfGood?: number) {
    const watchedCostOfGood = form.watch("costAndProfitData.itemCost");
    const amount = form.watch("priceData.discountedPrice");
    const parsedCostOfGood = Number(costOfGood || watchedCostOfGood);
    const parsedAmount = Number(amount);
    if (isNaN(parsedCostOfGood) || parsedCostOfGood === 0) {
      form.setValue("costAndProfitData.profit", parsedAmount);
      form.setValue("costAndProfitData.profitMargin", 100);
    } else {
      const profit = parsedAmount - parsedCostOfGood;
      form.setValue("costAndProfitData.profit", profit);
      form.setValue(
        "costAndProfitData.profitMargin",
        parseFloat(((profit / parsedAmount) * 100).toFixed(2))
      );
    }
  }

  function updateDiscountPriceArbitrarily(value?: DiscountEnumType) {
    const amount = form.watch("priceData.price");
    const discount = form.watch("discount.value");
    const parsedAmount = Number(amount);
    const parsedDiscount = Number(discount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      form.setValue("priceData.discountedPrice", 0);
      return;
    }
    if ((value || watchedDiscountType) === "PERCENT" && parsedDiscount >= 0) {
      form.setValue(
        "priceData.discountedPrice",
        parsedAmount - (parsedDiscount / 100) * parsedAmount
      );
    } else if (
      (value || watchedDiscountType) === "AMOUNT" &&
      parsedDiscount >= 0
    ) {
      form.setValue("priceData.discountedPrice", parsedAmount - parsedDiscount);
    }
    updateProfitsCostOfGoodArbitrarily();
    calculateBasePricePerUnit();
  }

  function calculateBasePricePerUnit(discountedPrice?: number) {
    const sellingPrice =
      discountedPrice || form.watch("priceData.discountedPrice");
    const totalQuantity = form.watch("pricePerUnitData.totalQuantity");
    const totalQuantityMeasurement = form.watch(
      "pricePerUnitData.totalMeasurementUnit"
    );
    const baseQuantity = form.watch("pricePerUnitData.baseQuality");
    const baseQuantityMeasureMent = form.watch(
      "pricePerUnitData.baseMeasurementUnit"
    );

    const convertedQuantity = convertUnits(
      sellingPrice,
      totalQuantity,
      baseQuantity,
      totalQuantityMeasurement,
      baseQuantityMeasureMent,
      currency
    );

    setBasePricePerUnit(convertedQuantity);
  }

  const baseMeasurementOptions = getUnitGroup(
    form.watch("pricePerUnitData.totalMeasurementUnit") ||
      MeasurementEnumUnit.KG
  );

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
                  <NumberInput
                    prefix={currency}
                    {...field}
                    postChange={() => updateDiscountPriceArbitrarily()}
                  />
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
                      {watchedDiscountType === "PERCENT"
                        ? "Percentage discount"
                        : "Discount amount"}
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
                          postChange={() => updateDiscountPriceArbitrarily()}
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
                                    onValueChange={(
                                      value: DiscountEnumType
                                    ) => {
                                      field.onChange(value || "PERCENT");
                                      updateDiscountPriceArbitrarily(
                                        value || "PERCENT"
                                      );
                                    }}
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
                      <NumberInput
                        className=" ps-12"
                        {...field}
                        prefix={currency}
                        postChange={updateSalePriceDependantArbitrarily}
                      />
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
                <p>
                  Let customers see prices based on fixed measurement units,{" "}
                  <strong className="font-semibold">
                    e.g., price per 100 grams of cheese.
                  </strong>
                </p>
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
                    <p>
                      {` Set your product’s total quantity in units, e.g.,`}{" "}
                      <strong className="font-semibold">
                        if your product weighs 100 grams and the unit is grams,
                        then the quantity is 100.
                      </strong>
                    </p>
                  </TooltipContainer>
                </div>
                <div className=" gap-4 grid grid-cols-2">
                  <FormField
                    control={form.control}
                    name="pricePerUnitData.totalQuantity"
                    render={({ field }) => (
                      <FormItem className="basis-1/3">
                        <FormControl>
                          <NumberInput
                            placeholder="0"
                            {...field}
                            postChange={() => calculateBasePricePerUnit()}
                          />
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
                          onValueChange={(e: MeasurementEnumUnit) => {
                            field.onChange(e || MeasurementEnumUnit.KG);
                            form.setValue(
                              "pricePerUnitData.baseMeasurementUnit",
                              e
                            );
                            calculateBasePricePerUnit();
                          }}
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
                <div className="flex flex-col pt-3">
                  <FormLabel>Base price per unit</FormLabel>
                  <h2>{basePricePerUnit}</h2>
                </div>
              </div>
              <div className="basis-1/3 flex flex-col gap-2">
                <div className="flex items-center">
                  <span className="line-clamp-1">Base units</span>
                  <TooltipContainer label="">
                    <p>
                      {`Set your product’s unit of measurement to calculate the base price,`}{" "}
                      <strong className="font-semibold">
                        e.g., for a product weighing 1 kilo, you may set the
                        base units to 100 g.
                      </strong>
                    </p>
                  </TooltipContainer>
                </div>
                <div className=" gap-4 grid grid-cols-2">
                  <FormField
                    control={form.control}
                    name="pricePerUnitData.baseQuality"
                    render={({ field }) => (
                      <FormItem className="basis-1/3">
                        <FormControl>
                          <NumberInput
                            placeholder="0"
                            {...field}
                            postChange={() => calculateBasePricePerUnit()}
                          />
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
                          onValueChange={(e) => {
                            field.onChange(e);
                            calculateBasePricePerUnit();
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="max-w-[280px]">
                              <SelectValue placeholder="Select a unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {baseMeasurementOptions.map(
                              ({ unit, label, abbreviation }) => (
                                <SelectItem key={unit} value={unit}>
                                  {`${label} (${abbreviation})`}
                                </SelectItem>
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
                  <p>
                    {` The amount you’re spending to produce and sell this product.`}{" "}
                    <strong className="font-semibold">{`Your customers won’t see this.`}</strong>
                  </p>
                </TooltipContainer>
                <FormControl>
                  <NumberInput
                    prefix={currency}
                    {...field}
                    postChange={updateProfitsCostOfGoodArbitrarily}
                  />
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
                  <NumberInput disabled prefix={currency} {...field} />
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
                  <p>
                    {`The percentage of the price that’s left after deducting your cost of goods.`}
                  </p>
                </TooltipContainer>
                <FormControl>
                  <div className="relative">
                    <NumberInput disabled className=" pe-12" {...field} />
                    <span className="absolute  right-2 top-1/2 -translate-y-1/2">
                      <PercentIcon className="size-4 text-muted-foreground" />
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
