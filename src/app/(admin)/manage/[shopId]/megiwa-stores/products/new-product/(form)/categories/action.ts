"use server";

import prisma from "@/lib/db";
import {
  upsertCollectionSchema,
  UpsertCollectionSchema,
} from "@/lib/validation";
import { Collection } from "@prisma/client";

export async function fetchFormCollections() {
  const data: Collection[] = await prisma.collection.findMany();
  return data;
}

export async function createFormCollection(collection: UpsertCollectionSchema) {
  const { name, description, slug, id, shopId, visible, numberOfProducts } =
    upsertCollectionSchema.parse(collection);
  const data = await prisma.collection.create({
    data: {
      name,
      description,
      slug,
      shopId: "0839d182-2e4e-49a9-92fd-bf813bbcd772",
      visible,
      numberOfProducts,
    },
  });
  return data;
}
