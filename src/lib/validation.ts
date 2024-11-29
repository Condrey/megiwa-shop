import {
  DiscountEnumType,
  InventoryStatus,
  MeasurementEnumUnit,
  ProductType,
} from "@prisma/client";
import cuid from "cuid";
import { z } from "zod";

export const requiredString = z.string().trim().min(1, "Required");
export const requiredNumber = z.number().min(1, "Required");

// Product
const choicesSchema = z
  .array(
    z.object({
      id: z.string().trim().optional(),
      value: requiredString,
      description: requiredString,
    })
  )
  .optional();
const rangeSchema = z
  .object({
    id: z.string().trim().optional(),
    minValue: requiredNumber,
    maxValue: requiredNumber,
  })
  .optional();
const priceDataSchema = z.object({
  id: z.string().trim().optional(),
  currency: requiredString,
  price: requiredNumber,
  discountedPrice: requiredNumber,
  formatted: z
    .object({
      id: z.string().trim().optional(),
      price: requiredString,
      discountedPrice: requiredString,
    })
    .optional(),
});
const stockSchema = z
  .object({
    id: z.string().trim().optional(),
    inventoryStatus: z.nativeEnum(InventoryStatus),
    quantity: z.number().optional(),
    trackInventory: z.boolean(),
  })
  .optional();
export const upsertProductSchema = z.object({
  id: z.string().trim().optional(),
  name: requiredString.max(100),
  ribbons: z.array(z.string().trim().optional()),
  description: z
    .string()
    .trim()
    .min(40, "Description must be at least 40 characters.")
    .max(1001, "Your description is ver long.")
    .optional(),
  discount: z
    .object({
      id: z.string().trim().optional(),
      type: z.nativeEnum(DiscountEnumType).default("AMOUNT"),
      value: requiredNumber,
    })
    .optional(),
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
  stock: stockSchema,
  sku: requiredString.default(cuid()),
  shopId: requiredString.default(cuid()),
  weight: z.number().optional(),
  visible: z.boolean().default(true),
  brand: z.string().optional(),
  additionalInfoSections: z
    .array(
      z.object({
        id: z.string().trim().optional(),
        title: requiredString,
        description: requiredString,
      })
    )
    .optional(),
  slug: requiredString,
  productType: z.nativeEnum(ProductType),
  weightRange: z
    .object({
      id: z.string().trim().optional(),
      minValue: requiredNumber,
      maxValue: requiredNumber,
    })
    .optional(),
  priceData: priceDataSchema,
  priceRange: rangeSchema,
  costRange: rangeSchema,
  manageVariants: z.boolean().default(false),
  productOptions: z.array(
    z.object({
      id: z.string().trim().optional(),
      optionType: requiredString,
      name: requiredString,
      choices: choicesSchema,
      inStock: z.boolean().default(true),
      visible: z.boolean().default(true),
    })
  ),
  productPageUrl: z
    .object({
      id: z.string().trim().optional(),
      base: requiredString,
      path: requiredString,
    })
    .optional(),
  numericId: z.string().trim().optional(),
  collectionIds: z.array(z.string().trim().optional()),
  variants: z.array(
    z.object({
      id: z.string().trim().optional(),
      choices: choicesSchema,
      variant: z.object({
        id: z.string().trim().optional(),
        priceData: priceDataSchema,
        Weight: z.string().trim().optional(),
        sku: z.string().trim().optional(),
        visible: z.boolean(),
      }),
      stock: stockSchema,
    })
  ),
  ribbon: z.string().trim().optional(),
});

export type UpsertProductSchema = z.infer<typeof upsertProductSchema>;
