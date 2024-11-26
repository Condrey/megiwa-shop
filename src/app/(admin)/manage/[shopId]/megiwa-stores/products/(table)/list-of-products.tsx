"use client";

import LoadingButton from "@/components/LoadingButton";
import { DataTable } from "@/components/ui/data-table";
import { ProductData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import AddProductButton from "../add-product-button";
import { getAllProducts } from "./action";
import { useProductColumns } from "./columns";

interface ListOfProductsProps {
  products: ProductData[];
}

export default function ListOfProducts({ products }: ListOfProductsProps) {
  const { data, status, error, refetch, isRefetching } = useQuery({
    queryKey: ["all-products"],
    queryFn: getAllProducts,
    initialData: products,
  });

  if (status === "success" && !data.length) {
    return (
      <div className="size-full gap-4 flex flex-col items-center justify-center">
        <p className="text-muted-foreground max-w-prose">
          You do not have any products in your shop yet. Please add to get
          started.
        </p>
        <AddProductButton />
      </div>
    );
  }
  if (status === "error") {
    console.error(error);
    return (
      <div className="size-full gap-4 flex flex-col items-center justify-center">
        <p className="text-muted-foreground max-w-prose">
          An error occurred while fetching products.
        </p>
        <LoadingButton
          loading={isRefetching}
          variant="destructive"
          onClick={() => refetch()}
        >
          Refetch Products
        </LoadingButton>
      </div>
    );
  }
  return (
    <div>
      <DataTable columns={useProductColumns} data={data} />
    </div>
  );
}
