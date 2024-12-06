import avatarUrl from "@/assets/avatar/product-options.png";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UpsertProductSchema } from "@/lib/validation";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../default-imports";
import { useUpsertVariantsArbitrarily } from "../hooks/variant";
import ButtonAddProductOption from "./button-add-product-option";
import ButtonEditProductOption from "./button-edit-product-option";
import ManagePricingAndInventory from "./manage-pricing-and-inventory";

export interface ProductOptionsProps {
  form: UseFormReturn<UpsertProductSchema>;
}
// TODO: implement the pop up dialog
export default function ProductOptions({ form }: ProductOptionsProps) {
  const { upsertVariants } = useUpsertVariantsArbitrarily(form);
  const watchedProductOptions = form.watch("productOptions");
  const { update, remove } = useFieldArray({
    control: form.control,
    name: "productOptions",
  });

  return (
    <>
      {!watchedProductOptions.length && (
        <Card>
          <CardHeader className="flex-row justify-between gap-4">
            <div className="flex flex-col gap-3 basis-2/3">
              <CardTitle>Product options</CardTitle>
              <CardDescription>
                Does your product come in different options, like size, color or
                material? Add them here.
              </CardDescription>
              <ButtonAddProductOption form={form} />
            </div>
            <div className="basis-1/3">
              <Image
                src={avatarUrl}
                alt="product_options_avatar"
                height={150}
                width={150}
              />
            </div>
          </CardHeader>
        </Card>
      )}
      {!!watchedProductOptions.length && (
        <Card>
          <CardHeader>
            <CardTitle>
              Product options{" "}
              <span className="text-muted-foreground">
                {watchedProductOptions.length}
              </span>
            </CardTitle>
            <CardDescription>
              Manage the options this product comes in.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {watchedProductOptions.map((option, iteration) => (
                <div
                  key={option.id}
                  className={cn(
                    buttonVariants({
                      className:
                        "flex w-full h-fit  gap-4 justify-start group/option items-center",
                      variant: "secondary",
                    })
                  )}
                >
                  <span className="font-bold min-w-40">{option.name}</span>
                  {option.choices && !!option.choices.length && (
                    <div className="flex gap-1 flex-wrap">
                      {option.choices.map((choice) => {
                        if (option.optionType === "COLOR") {
                          return (
                            <div
                              key={choice.id}
                              className="flex items-center gap-1 after:content-[','] last:after:content-['']"
                            >
                              <div
                                className="size-4 rounded-full"
                                style={{ backgroundColor: choice.value }}
                              />
                              <span>{choice.description}</span>
                            </div>
                          );
                        }
                        return (
                          <div
                            key={choice.id}
                            className="after:content-[','] last:after:content-['']"
                          >
                            <span>{choice.value}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div className="flex items-center gap-2 flex-none ms-auto md:invisible group-hover/option:visible">
                    <ButtonEditProductOption
                      form={form}
                      productOption={option}
                      onProductOptionUpdate={(updatedOption) =>
                        update(iteration, updatedOption)
                      }
                    />
                    <Button
                      type="button"
                      title="Remove option"
                      variant={"ghost"}
                      size={"icon"}
                      onClick={() => {
                        if (form.watch("manageVariants")) {
                          const newOptions = watchedProductOptions.filter(
                            (w) => w.id !== option.id
                          );
                          upsertVariants(newOptions);
                        }
                        remove(iteration);
                      }}
                    >
                      <Trash2Icon className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <ButtonAddProductOption form={form} />
            </div>
          </CardContent>
          <hr className="mb-4" />
          <CardFooter>
            <ManagePricingAndInventory form={form} />
          </CardFooter>
        </Card>
      )}
    </>
  );
}
