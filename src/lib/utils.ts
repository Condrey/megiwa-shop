import { products } from "@wix/stores";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import { ProductData } from "./types";

export const twConfig = resolveConfig(tailwindConfig);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatCurrency(
  price: number | string = 0,
  currency: string | null
) {
  return Intl.NumberFormat("en", {
    style: "currency",
    currency: currency || "UGX",
  }).format(Number(price));
}

export function findVariant(
  product: products.Product,
  selectedOptions: Record<string, string>
) {
  if (!product.manageVariants) return null;

  return (
    product.variants?.find((variant) => {
      return Object.entries(selectedOptions).every(
        ([key, value]) => variant.choices?.[key] === value
      );
    }) || null
  );
}

export function checkInStock(
  product: products.Product,
  selectedOptions: Record<string, string>
) {
  const variant = findVariant(product, selectedOptions);

  return variant
    ? variant.stock?.quantity !== 0 && variant.stock?.inStock
    : product.stock?.inventoryStatus === products.InventoryStatus.IN_STOCK ||
        product.stock?.inventoryStatus ===
          products.InventoryStatus.PARTIALLY_OUT_OF_STOCK;
}

export function formatNumber(n: number): string {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

export function slugify(input: string | undefined): string {
  return input
    ? input
        .toLocaleLowerCase()
        .replace(/ /g, "-")
        .replace(/[^a-z0-9]/g, "")
    : "";
}

export function getFormattedPrice(product: ProductData) {
  const minPrice = product.priceRange?.minValue;
  const maxPrice = product.priceRange?.maxValue;

  if (minPrice && maxPrice && minPrice !== maxPrice) {
    return `from ${formatCurrency(minPrice, product.priceData?.currency!)}`;
  } else {
    return (
      product.priceData?.formatted?.discountedPrice ||
      product.priceData?.formatted?.price ||
      "n/a"
    );
  }
}
