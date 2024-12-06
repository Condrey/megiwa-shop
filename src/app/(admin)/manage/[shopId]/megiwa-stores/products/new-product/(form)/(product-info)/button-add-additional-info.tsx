import { UpsertProductSchema } from "@/lib/validation";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../default-imports";
import DialogAddEditInformationSection from "./dialog-add-edit-info-section";

interface ButtonAddAdditionalInfoProps {
  form: UseFormReturn<UpsertProductSchema>;
}

export default function ButtonAddAdditionalInfo({
  form,
}: ButtonAddAdditionalInfoProps) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant={"ghost"}
        className="text-primary"
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        <PlusIcon className="mr-2 size-4" />
        <span>Add an info section</span>
      </Button>

      <DialogAddEditInformationSection
        form={form}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
}
