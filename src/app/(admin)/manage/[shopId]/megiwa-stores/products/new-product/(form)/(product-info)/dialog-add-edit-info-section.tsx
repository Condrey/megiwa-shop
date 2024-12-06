import ResponsiveDrawer from "@/components/responsive-drawer";
import TipTapEditorWithHeader from "@/components/tip-tap-editor/tip-tap-editor-with-header";
import {
  AdditionalInfoSectionSchema,
  additionalInfoSectionSchema,
  UpsertProductSchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import cuid from "cuid";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "../default-imports";

interface DialogAddEditInformationSectionProps {
  form: UseFormReturn<UpsertProductSchema>;
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
  infoSectionToEdit?: AdditionalInfoSectionSchema;
  index?: number;
}
export default function DialogAddEditInformationSection({
  form,
  openDialog,
  setOpenDialog,
  infoSectionToEdit,
  index,
}: DialogAddEditInformationSectionProps) {
  const { remove, append, update } = useFieldArray({
    control: form.control,
    name: "additionalInfoSections",
  });

  const form2 = useForm<AdditionalInfoSectionSchema>({
    resolver: zodResolver(additionalInfoSectionSchema),
    defaultValues: !infoSectionToEdit
      ? {
          description: "",
          id: cuid(),
          title: "",
        }
      : infoSectionToEdit,
  });

  function handleOnSubmit(input: AdditionalInfoSectionSchema) {
    if (!infoSectionToEdit) {
      append({ ...input, id: cuid() });
      form2.reset();
    } else {
      update(index!, input);
    }
    setOpenDialog(false);
  }

  return (
    <ResponsiveDrawer
      open={openDialog}
      setOpen={setOpenDialog}
      title="Add an info section"
      className="max-w-3xl"
    >
      <Form {...form2}>
        <form className="space-y-6">
          <FormField
            control={form2.control}
            name="title"
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
            control={form2.control}
            name="description"
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
            {!!infoSectionToEdit && (
              <Button
                type="button"
                variant={"destructive"}
                onClick={() => {
                  remove(index!);
                  setOpenDialog(false);
                }}
              >
                Remove this info
              </Button>
            )}
            <div className="flex gap-4 w-full justify-end items-center">
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
                  form2.handleSubmit(handleOnSubmit)();
                }}
              >
                {!infoSectionToEdit ? "Ok" : "Update"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </ResponsiveDrawer>
  );
}
