import { Prisma } from "@prisma/client";

// Product
export const productDataInclude = {
  media: { include: { mainMedia: { include: { image: true } } } },
  priceData: { include: { formatted: true } },
  priceRange: true,
  _count: { select: { variants: true } },
} satisfies Prisma.ProductInclude;
export type ProductData = Prisma.ProductGetPayload<{
  include: typeof productDataInclude;
}>;
