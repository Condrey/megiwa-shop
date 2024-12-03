"use client";

import MegiwaImage from "@/components/megiwa-image";
import { DataTableColumnHeader } from "@/components/ui/data-column-header";
import { ProductData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { ProductType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const useProductColumns: ColumnDef<ProductData>[] = [
  {
    id: "index",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex gap-4 items-center">
          <MegiwaImage
            mediaIdentifier={product.media?.mainMedia?.image?.url}
            height={55}
            width={55}
          />
          <div className="flex flex-col gap-0.5 overflow-hidden">
            <h4 className="line-clamp-2 ">{product.name}</h4>
            <p className="text-muted-foreground">{`${formatNumber(product._count.variants)} variant${product._count.variants === 1 ? "" : "s"}`}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "productType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const product = row.original;
      const productTypeMapping: Record<ProductType, string> = {
        DIGITAL: "Digital",
        UNSPECIFIED_PRODUCT_TYPE: "N/A",
        PHYSICAL: "Physical",
      };
      return (
        productTypeMapping[
          product.productType || "UNSPECIFIED_PRODUCT_TYPE"
        ].toString() || "N/A"
      );
    },
  },
  {
    accessorKey: "sku",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SKU" />
    ),
  },
  {
    accessorKey: "priceData",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const product = row.original;
      const discountedPrice = product.priceData?.discountedPrice;
      if (!!discountedPrice && discountedPrice > 0) {
        return (
          <div className="flex flex-col">
            <span className="line-through text-muted-foreground">
              {product.priceData?.formatted?.price ?? 0}
            </span>
            <span>{product.priceData?.formatted?.discountedPrice ?? 0}</span>
          </div>
        );
      }
      return <span>{product.priceData?.formatted?.price ?? 0}</span>;
    },
  },
];
