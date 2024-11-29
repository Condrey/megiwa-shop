import ResponsiveDrawer from "@/components/responsive-drawer";
import TipTapEditorWithHeader from "@/components/tip-tap-editor/tip-tap-editor-with-header";
import { UpsertProductSchema } from "@/lib/validation";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import striptags from "striptags";
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "../default-imports";

interface AdditionalInfoProps {
  form: UseFormReturn<UpsertProductSchema>;
}

export default function AdditionalInfo({ form }: AdditionalInfoProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentArrayIndex, setCurrentArrayIndex] = useState(0);
  const { fields: additionalInfoSections, append } = useFieldArray({
    control: form.control,
    name: "additionalInfoSections",
  });
  const watchedInfoSections = form.watch("additionalInfoSections");

  return (
    <>
      <div className=" flex flex-col gap-2 w-full">
        {!!watchedInfoSections &&
          !!watchedInfoSections.length &&
          watchedInfoSections.map((additionalInfo, index) => (
            <Button
              key={index}
              className="flex gap-4 w-full justify-start"
              variant={"secondary"}
              type="button"
              onClick={() => {
                setCurrentArrayIndex(index);
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
          ))}
      </div>
      <Button
        type="button"
        variant={"ghost"}
        className="text-primary"
        onClick={() => {
          setCurrentArrayIndex(additionalInfoSections.length);
          append({ title: "", description: "" });
          setOpenDialog(true);
        }}
      >
        <PlusIcon className="mr-2 size-4" />
        <span>Add an info section</span>
      </Button>

      <AdditionalInformationPopup
        currentArrayIndex={currentArrayIndex}
        form={form}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
}

interface AdditionalInformationPopup extends AdditionalInfoProps {
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
  currentArrayIndex: number;
}
function AdditionalInformationPopup({
  form,
  openDialog,
  setOpenDialog,
  currentArrayIndex,
}: AdditionalInformationPopup) {
  const { remove } = useFieldArray({
    control: form.control,
    name: "additionalInfoSections",
  });

  return (
    <ResponsiveDrawer
      open={openDialog}
      setOpen={setOpenDialog}
      title="Add an info section"
      className="max-w-3xl"
    >
      <div className="space-y-6">
        <FormField
          control={form.control}
          name={`additionalInfoSections.${currentArrayIndex}.title`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Info section title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., laptop specs" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`additionalInfoSections.${currentArrayIndex}.description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <TipTapEditorWithHeader
                  initialContent={field.value}
                  onTextChanged={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-between">
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => {
              remove(currentArrayIndex);
              setOpenDialog(false);
            }}
          >
            Remove this info
          </Button>
          <div className="flex gap-4 justify-end items-center">
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => {
                setOpenDialog(false);
              }}
            >
              Ok
            </Button>
          </div>
        </div>
      </div>
    </ResponsiveDrawer>
  );
}
