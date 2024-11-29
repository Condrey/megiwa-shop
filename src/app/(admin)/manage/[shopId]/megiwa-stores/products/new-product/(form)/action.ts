"use server";

import prisma from "@/lib/db";
import { upsertProductSchema, UpsertProductSchema } from "@/lib/validation";

export async function createNewProduct(product: UpsertProductSchema) {
  const {
    name,
    ribbon,
    description,
    price,
    discount,
    salePrice,
    pricePerUnitData,
    costAndProfitData,
    customTextFields,
    stock,
    sku,
    shopId,
    weight,
    brand,
    additionalInfoSections,
  } = upsertProductSchema.parse(product);
  await prisma.product.create({
    data: {
      name,
      ribbon,
      description,
      sku,
      weight,
      brand,
    },
  });
}
