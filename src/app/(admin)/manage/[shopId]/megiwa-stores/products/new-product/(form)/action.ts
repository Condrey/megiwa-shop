"use server";

import prisma from "@/lib/db";
import { upsertProductSchema, UpsertProductSchema } from "@/lib/validation";

export async function createNewProduct(product: UpsertProductSchema) {
  const {
    name,
    ribbon,
    description,
    discount,
    pricePerUnitData,
    costAndProfitData,
    customTextFields,
    stock,
    sku,
    shopId,
    weight,
    brand,
    additionalInfoSections,
    collectionIds,
    manageVariants,
    priceData,
    productOptions,
    productType,
    ribbons,
    slug,
    variants,
    visible,
    costRange,
    id,
    numericId,
    priceRange,
    productPageUrl,
    weightRange,
  } = upsertProductSchema.parse(product);
  await prisma.product.create({
    data: {
      name,
      ribbon,
      description,
      discount: { create: { ...discount } },
      pricePerUnitData: { create: { ...pricePerUnitData } },
      costAndProfitData: { create: { ...costAndProfitData } },
      customTextFields: { create: customTextFields },
      stock: { create: { ...stock } },
      sku,
      shopId,
      weight,
      brand,
      additionalInfoSections: { create: additionalInfoSections },
      collectionIds: collectionIds.filter(Boolean) as string[],
      manageVariants,
      priceData: {
        create: {
          ...priceData,
          formatted: { create: { ...priceData.formatted } },
        },
      },
      productOptions: { create: productOptions },
      productType,
      ribbons: ribbons.filter(Boolean) as string[],
      slug,
      variants: { create: variants },
      visible,
      costRange: { create: { ...costRange } },
      id,
      numericId,
      priceRange: { create: { ...priceRange } },
      productPageUrl: { create: { ...priceRange } },
      weightRange: { create: { ...priceRange } },
    },
  });
}
