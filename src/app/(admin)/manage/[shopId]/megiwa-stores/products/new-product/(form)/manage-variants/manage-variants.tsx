import { DataTableColumnHeader } from "@/components/ui/data-column-header";
import { DataTable } from "@/components/ui/data-table";
import { ProductVariantSchema, UpsertProductSchema } from "@/lib/validation";
import { ColumnDef } from "@tanstack/react-table";
import { UseFormReturn } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../default-imports";

interface ManageVariantsProps {
  form: UseFormReturn<UpsertProductSchema>;
  watchedVariants: ProductVariantSchema[];
}

export default function ManageVariants({
  form,
  watchedVariants,
}: ManageVariantsProps) {
  return (
    <Card>
      <CardHeader className="flex-row gap-4">
        <CardTitle>Manage variants</CardTitle>
        <Button type="button" variant={"outline"} className="ms-auto">
          Edit
        </Button>
      </CardHeader>
      <CardContent>
        {watchedVariants.length}
        <DataTable columns={useVariantColumn} data={watchedVariants} />
      </CardContent>
    </Card>
  );
}

const useVariantColumn: ColumnDef<ProductVariantSchema>[] = [
  {
    id: "index",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "choices",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Variant" />
    ),
    cell: ({ row }) => {
      const variant = row.original;
      return <span>{variant.choices["COLOR"]}</span>;
    },
  },
];
