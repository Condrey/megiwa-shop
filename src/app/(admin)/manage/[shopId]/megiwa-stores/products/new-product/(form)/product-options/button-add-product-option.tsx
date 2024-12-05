import { cn } from "@/lib/utils";
import { UpsertProductSchema } from "@/lib/validation";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../default-imports";
import AddEditProductOptionsDialog from "./add-edit-product-options-dialog";

interface ButtonAddProductOptionProps {
  form: UseFormReturn<UpsertProductSchema>;
}

export default function ButtonAddProductOption({
  form,
}: ButtonAddProductOptionProps) {
  const [open, setOpen] = useState(false);
  const previousOptions = form.watch("productOptions");
  return (
    <>
      <Button
        disabled={!form.formState.isDirty}
        type="button"
        onClick={() => setOpen(true)}
        className={cn("w-fit mt-4")}
      >
        <PlusIcon className="mr-2 size-4" />
        <span>Add options</span>
      </Button>
      <AddEditProductOptionsDialog
        open={open}
        setOpen={setOpen}
        form={form}
        previousOptions={previousOptions}
      />
    </>
  );
}
