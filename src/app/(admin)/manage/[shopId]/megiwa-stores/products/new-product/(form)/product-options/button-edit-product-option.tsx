import { cn } from "@/lib/utils";
import { ProductOptionSchema, UpsertProductSchema } from "@/lib/validation";
import { Edit2Icon } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../default-imports";
import AddEditProductOptionsDialog from "./add-edit-product-options-dialog";

interface ButtonEditProductOptionProps {
  form: UseFormReturn<UpsertProductSchema>;
  productOption: ProductOptionSchema;
  onProductOptionUpdate: (productOption: ProductOptionSchema) => void;
}

export default function ButtonEditProductOption({
  form,
  productOption,
  onProductOptionUpdate,
}: ButtonEditProductOptionProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        title="Edit option"
        variant={"ghost"}
        size={"icon"}
        onClick={() => setOpen(true)}
        className={cn("w-fit")}
      >
        <Edit2Icon className="size-4" />
      </Button>
      <AddEditProductOptionsDialog
        open={open}
        setOpen={setOpen}
        form={form}
        productOptionToEdit={productOption}
        onProductOptionUpdate={onProductOptionUpdate}
      />
    </>
  );
}
