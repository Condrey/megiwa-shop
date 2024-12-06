import {
  AdditionalInfoSectionSchema,
  UpsertProductSchema,
} from "@/lib/validation";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import striptags from "striptags";
import { Button } from "../default-imports";
import DialogAddEditInformationSection from "./dialog-add-edit-info-section";
interface ButtonEditAdditionalInfoProps {
  form: UseFormReturn<UpsertProductSchema>;
  additionalInfo: AdditionalInfoSectionSchema;
  iteration: number;
}

export default function ButtonEditAdditionalInfo({
  form,
  additionalInfo,
  iteration,
}: ButtonEditAdditionalInfoProps) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Button
        className="flex gap-4 w-full justify-start"
        variant={"secondary"}
        type="button"
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        <h6 className="basis-1/3 font-semibold text-start  line-clamp-1">
          {additionalInfo.title}
        </h6>
        <p className="basis-2/3 text-start line-clamp-1">
          {striptags(additionalInfo.description)}
        </p>
      </Button>
      <DialogAddEditInformationSection
        form={form}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        infoSectionToEdit={additionalInfo}
        index={iteration}
      />
    </>
  );
}
