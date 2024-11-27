import TipTapEditorWithHeader from "@/components/tip-tap-editor/tip-tap-editor-with-header";
import { UpsertProductSchema } from "@/lib/validation";
import { PlusIcon, StarsIcon } from "lucide-react";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import {
  Button,
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
} from "./default-imports";
import TooltipContainer from "./tooltip-container";

interface ProductInfoProps {
  form: UseFormReturn<UpsertProductSchema>;
}

export default function ProductInfo({ form }: ProductInfoProps) {
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
                  <Input {...field} placeholder="Add a product name" />
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
                  <span>
                    Add a label like “New Arrival” or “Sale” to make this
                    product stand out. It’ll be displayed on your product
                    galleries and widgets.
                  </span>{" "}
                  <Link href="#" className="hover:underline text-primary">
                    See how ribbons look
                  </Link>
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
                  <Button
                    type="button"
                    className="text-primary"
                    variant={"ghost"}
                  >
                    <StarsIcon className="mr-2 size-6" />
                    <span>Generate AI Text</span>
                  </Button>
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
        {/* TODO: implement additional information button  */}
        <Button type="button" variant={"ghost"} className="text-primary">
          <PlusIcon className="mr-2 size-4" />
          <span>Add an info section</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
