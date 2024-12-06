import { DataTableColumnHeader } from "@/components/ui/data-column-header";
import { DataTable } from "@/components/ui/data-table";
import { cn, formatCurrency } from "@/lib/utils";
import { ProductVariantSchema, UpsertProductSchema } from "@/lib/validation";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../default-imports";
import DialogEditVariantForm from "./dialog-edit-variant-form";

interface ManageVariantsProps {
  form: UseFormReturn<UpsertProductSchema>;
}

export default function ManageVariants({ form }: ManageVariantsProps) {
  const [open, setOpen] = useState(false);
  const watchedPriceData = form.watch("priceData");
  const watchedVariants = form.watch("variants");
  const columns = getVariantColumns(watchedPriceData.discountedPrice);
  return (
    <>
      <Card>
        <CardHeader className="flex-row items-end gap-4">
          <CardTitle>
            Manage variants{" "}
            <span className="text-muted-foreground">
              {watchedVariants!.length}
            </span>
          </CardTitle>
          <Button
            type="button"
            // variant={"outline"}
            className="ms-auto"
            onClick={() => setOpen(true)}
          >
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={watchedVariants}
            ROWS_PER_TABLE={5}
            className="p-0 "
          />
        </CardContent>
      </Card>

      <DialogEditVariantForm
        open={open}
        setOpen={setOpen}
        originalPrice={watchedPriceData.price}
        originalDiscountedPrice={watchedPriceData.discountedPrice}
        form={form}
        productVariants={watchedVariants}
      />
    </>
  );
}

const getVariantColumns = (
  discountedPrice: number
): ColumnDef<ProductVariantSchema>[] => {
  return [
    {
      accessorKey: "choices",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Variant" />
      ),
      cell: ({ row }) => {
        const variant = row.original;
        const formattedChoices = Object.values(variant.choices).join(", ");
        return <span>{formattedChoices}</span>;
      },
    },
    {
      accessorKey: "price-difference",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price Difference(+/-)" />
      ),
      cell: ({ row }) => {
        // TODO:  get the original price
        const productOption = row.original;
        const newPrice = productOption.variant.priceData.discountedPrice;
        const priceDifference = newPrice - discountedPrice;
        return (
          <span
            className={cn(
              "rounded-md px-2 py-1 tabular-nums",
              priceDifference > 0 && "text-green-50 bg-green-500",
              priceDifference < 0 &&
                "text-destructive-foreground bg-destructive"
            )}
          >
            {priceDifference > 0 && <span>+</span>}
            {formatCurrency(
              priceDifference,
              productOption.variant.priceData.currency
            )}
          </span>
        );
      },
    },
    {
      accessorKey: "variant.priceData.discountedPrice",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Variant price" />
      ),
      cell: ({ row }) => {
        const productOption = row.original;
        return (
          <span>
            {formatCurrency(
              productOption.variant.priceData.discountedPrice,
              productOption.variant.priceData.currency
            )}
          </span>
        );
      },
    },
    {
      accessorKey: "stock.inStock",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const productOption = row.original;

        return (
          <span>
            {(productOption.stock.quantity || 0) > 0
              ? "In stock"
              : "Out of stock"}
          </span>
        );
      },
      enableHiding: false,
    },
    {
      accessorKey: "stock.quantity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Inventory" />
      ),
      cell: ({ row }) => {
        const productOption = row.original;

        return (
          <span>
            {productOption.stock.trackQuantity
              ? productOption.stock.quantity
              : "-"}
          </span>
        );
      },
    },
    {
      accessorKey: "variant.visible",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Visibility" />
      ),
      cell: ({ row }) => {
        const productOption = row.original;
        const isVisible = productOption.variant.visible;
        return (
          <span title={isVisible ? "Visible" : "Not visible"}>
            {isVisible ? (
              <EyeIcon className="size-4" />
            ) : (
              <EyeOffIcon className="size-4" />
            )}
            <span className="sr-only">
              {isVisible ? "Visible" : "Not visible"}
            </span>
          </span>
        );
      },
    },
  ];
};
