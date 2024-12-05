import { DataTableColumnHeader } from "@/components/ui/data-column-header";
import { DataTable } from "@/components/ui/data-table";
import { formatCurrency } from "@/lib/utils";
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
  watchedVariants: ProductVariantSchema[];
}

export default function ManageVariants({
  form,
  watchedVariants,
}: ManageVariantsProps) {
  const [open, setOpen] = useState(true);
  const watchedPriceData = form.watch("priceData");
  const columns = getVariantColumns(watchedPriceData.discountedPrice);
  return (
    <>
      <Card>
        <CardHeader className="flex-row items-end gap-4">
          <CardTitle>Manage variants</CardTitle>
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
            className="p-0 
           "
          />
        </CardContent>
      </Card>

      <DialogEditVariantForm
        open={open}
        setOpen={setOpen}
        originalPrice={watchedPriceData.discountedPrice}
        productVariants={watchedVariants}
      />
    </>
  );
}

const getVariantColumns = (
  originalPrice: number
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
        const newPrice = productOption.variant.priceData.price;
        return (
          <span>
            {formatCurrency(
              newPrice - originalPrice,
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
