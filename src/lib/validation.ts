import {
  DiscountEnumType,
  InventoryStatus,
  MeasurementEnumUnit,
} from "@prisma/client";
import cuid from "cuid";
import { z } from "zod";

export const requiredString = z.string().trim().min(1, "Required");
export const requiredNumber = z.number().min(1, "Required");

// Product
export const upsertProductSchema = z.object({
  id: z.string().trim().optional(),
  name: requiredString,
  ribbon: z.string().trim().optional(),
  description: z
    .string()
    .trim()
    .min(40, "Description must be at least 40 characters.")
    .max(1001, "Your description is ver long.")
    .optional(),
  price: requiredNumber,
  discount: z
    .object({
      id: z.string().trim().optional(),
      type: z.nativeEnum(DiscountEnumType).default("AMOUNT"),
      value: requiredNumber,
    })
    .optional(),
  salePrice: z.number().optional(),
  pricePerUnitData: z
    .object({
      id: z.string().trim().optional(),
      baseMeasurementUnit: z.nativeEnum(MeasurementEnumUnit),
      baseQuality: requiredNumber,
      totalMeasurementUnit: z.nativeEnum(MeasurementEnumUnit),
      totalQuantity: requiredNumber,
    })
    .optional(),
  costAndProfitData: z
    .object({
      id: z.string().trim().optional(),
      itemCost: requiredNumber,
      profit: requiredNumber,
      profitMargin: requiredNumber,
    })
    .optional(),
  customTextFields: z.array(
    z.object({
      id: z.string().trim().optional(),
      mandatory: z.boolean(),
      maxLength: requiredNumber.min(1),
      title: requiredString,
    })
  ),
  stock: z
    .object({
      id: z.string().trim().optional(),
      inventoryStatus: z.nativeEnum(InventoryStatus),
      quantity: z.number().optional(),
      trackInventory: z.boolean(),
    })
    .optional(),
  sku: requiredString.default(cuid()),
  weight: z.string().optional(),
  visible: z.boolean().default(true),
  brand: z.string().optional(),
});
export type UpsertProductSchema = z.infer<typeof upsertProductSchema>;
