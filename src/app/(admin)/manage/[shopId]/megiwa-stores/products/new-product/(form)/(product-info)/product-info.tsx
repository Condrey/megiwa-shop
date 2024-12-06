import TipTapEditorWithHeader from "@/components/tip-tap-editor/tip-tap-editor-with-header";
import { slugify } from "@/lib/utils";
import { UpsertProductSchema } from "@/lib/validation";
import { debounce } from "lodash";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "../default-imports";
import TooltipContainer from "../tooltip-container";
import AdditionalInfo from "./additional-info";
import AiForDescription from "./ai-for-description";

interface ProductInfoProps {
  form: UseFormReturn<UpsertProductSchema>;
}

export default function ProductInfo({ form }: ProductInfoProps) {
  const debouncedSetSlug = debounce((value, form) => {
    form.setValue("slug", slugify(value));
  }, 300);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product info</CardTitle>
        <CardDescription className="tracking-widest uppercase">
          Basic info
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex gap-4 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="basis-2/3">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Add a product name"
                    onChange={(e) => {
                      field.onChange(e);
                      debouncedSetSlug(e.target.value, form);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ribbon"
            render={({ field }) => (
              <FormItem className="basis-1/3">
                {/* TODO: link to show appearance of ribbon */}

                <TooltipContainer label="Ribbon">
                  <p>
                    Add a label like{" "}
                    <strong className="font-semibold">“New Arrival”</strong> or{" "}
                    <strong className="font-semibold">“Sale”</strong> to make
                    this product stand out.{" "}
                    {`It’ll be displayed on your product galleries and widgets.`}{" "}
                    <Link href="#" className="hover:underline text-primary">
                      See how ribbons look
                    </Link>
                  </p>
                </TooltipContainer>

                <FormControl>
                  <Input {...field} placeholder="e.g. New Arrival" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col">
          {/* TODO: implement the Ai functionality  */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-4 items-center justify-between">
                  <FormLabel>Description</FormLabel>
                  <AiForDescription form={form} />
                </div>
                <FormControl>
                  <TipTapEditorWithHeader
                    initialContent={field.value}
                    placeholder="Give your product a professional  description"
                    onTextChanged={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
      <CardHeader>
        <CardDescription className="tracking-widest uppercase">
          Additional info section
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-4">
        <p>
          Share information like return policy or care instructions with your
          customers.
        </p>
        <AdditionalInfo form={form} />
      </CardFooter>
    </Card>
  );
}
