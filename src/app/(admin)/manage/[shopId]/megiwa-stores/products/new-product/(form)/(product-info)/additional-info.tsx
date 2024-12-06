import { UpsertProductSchema } from "@/lib/validation";
import { UseFormReturn } from "react-hook-form";
import ButtonAddAdditionalInfo from "./button-add-additional-info";
import ButtonEditAdditionalInfo from "./button-edit-additional-info";

interface AdditionalInfoProps {
  form: UseFormReturn<UpsertProductSchema>;
}

export default function AdditionalInfo({ form }: AdditionalInfoProps) {
  const watchedInfoSections = form.watch("additionalInfoSections");

  return (
    <>
      <div className=" flex flex-col gap-2 w-full">
        {!!watchedInfoSections &&
          !!watchedInfoSections.length &&
          watchedInfoSections.map((additionalInfo, index) => (
            <ButtonEditAdditionalInfo
              key={index}
              form={form}
              additionalInfo={additionalInfo}
              iteration={index}
            />
          ))}
      </div>
      <ButtonAddAdditionalInfo form={form} />
    </>
  );
}
