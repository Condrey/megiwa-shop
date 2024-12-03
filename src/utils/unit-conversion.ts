import { groupedUnits } from "@/app/(admin)/manage/[shopId]/megiwa-stores/products/new-product/(form)/default-imports";
import { formatCurrency } from "@/lib/utils";
import { MeasurementEnumUnit } from "@prisma/client";

const unitConversionRates: Record<MeasurementEnumUnit, number> = {
  ML: 1, // Milliliters
  CL: 10, // Centiliters
  L: 1000, // Liters
  CBM: 1000000, // Cubic meters
  MG: 0.001, // Milligrams
  G: 1, // Grams
  KG: 1000, // Kilograms
  MM: 0.001, // Millimeters
  CM: 0.01, // Centimeters
  M: 1, // Meters
  SQM: 1, // Square meters
  OZ: 28.3495, // Ounces (weight)
  LB: 453.592, // Pounds
  FLOZ: 29.5735, // Fluid ounces
  PT: 473.176, // Pints
  QT: 946.353, // Quarts
  GAL: 3785.41, // Gallons
  IN: 0.0254, // Inches
  FT: 0.3048, // Feet
  YD: 0.9144, // Yards
  SQFT: 0.092903,
  UNSPECIFIED: 0,
};

export function convertUnits(
  sellingPrice: number,
  totalQuantity: number,
  baseQuantity: number,
  totalQuantityMeasurement: MeasurementEnumUnit,
  baseQuantityMeasurement: MeasurementEnumUnit,
  currency: string
) {
  if (
    !sellingPrice ||
    !totalQuantity ||
    !baseQuantity ||
    !totalQuantityMeasurement ||
    !baseQuantityMeasurement
  ) {
    return formatCurrency(0, currency);
  }
  const unitCost =
    sellingPrice /
    (totalQuantity * (unitConversionRates[totalQuantityMeasurement] || 1));

  const basePricePerUnit =
    unitCost * baseQuantity * unitConversionRates[baseQuantityMeasurement];
  return `${formatCurrency(basePricePerUnit, currency)}/${baseQuantity.toLocaleString()} ${baseQuantityMeasurement}`;
}

export function getUnitGroup(measurement: MeasurementEnumUnit) {
  return (
    Object.entries(groupedUnits).find(([_, units]) =>
      units.some((unit) => unit.unit === measurement)
    )?.[1] ?? []
  );
}
