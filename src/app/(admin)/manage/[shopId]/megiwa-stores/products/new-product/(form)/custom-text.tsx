import { UpsertProductSchema } from "@/lib/validation";
import cuid from "cuid";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "./default-imports";

interface CustomTextProps {
  form: UseFormReturn<UpsertProductSchema>;
}

export default function CustomText({ form }: CustomTextProps) {
  const {
    fields: customTextFields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "customTextFields",
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom text</CardTitle>
        <CardDescription>
          Allow customers to personalize this product with a custom text field.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!customTextFields.length && (
          <Button
            type="button"
            variant={"secondary"}
            onClick={() =>
              append({
                mandatory: false,
                maxLength: 500,
                title: "",
                id: cuid(),
              })
            }
          >
            Add Custom text Field
          </Button>
        )}
        {!!customTextFields.length && (
          <div className="flex flex-col gap-6">
            {customTextFields.map((customTextField, index) => (
              <div key={customTextField.id} className="flex gap-4">
                <div className="flex flex-col gap-6 basis-2/3">
                  <FormField
                    control={form.control}
                    name={`customTextFields.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Text field title</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder='e.g., "What text would you like to be engraved on your watch?"'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`customTextFields.${index}.mandatory`}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex  items-center gap-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Mandatory field </FormLabel>
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-2 basis-1/3 items-start">
                  <FormField
                    control={form.control}
                    name={`customTextFields.${index}.maxLength`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Character limit</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder='e.g., "What text would you like to be engraved on your watch?"'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant={"ghost"}
                    size={"icon"}
                    className="text-primary"
                    onClick={() => remove(index)}
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {!!customTextFields.length && (
        <CardFooter>
          <Button
            type="button"
            variant={"ghost"}
            onClick={() =>
              append({
                mandatory: false,
                maxLength: 500,
                title: "",
                id: cuid(),
              })
            }
            className="text-primary"
          >
            <PlusIcon className="size-4 mr-2 " />
            <span>Add another</span>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
