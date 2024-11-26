"use server";

import prisma from "@/lib/db";
import { productDataInclude } from "@/lib/types";

export async function getAllProducts() {
  return await prisma.product.findMany({
    include: productDataInclude,
  });
}
