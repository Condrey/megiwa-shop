import ResponsiveDrawer from "@/components/responsive-drawer";
import Badge from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import {
  ChoiceSchema,
  productOptionSchema,
  ProductOptionSchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { OptionType } from "@prisma/client";
import cuid from "cuid";
import {
  CheckIcon,
  DropletIcon,
  FileQuestion,
  ListIcon,
  LucideIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ToggleGroup,
  ToggleGroupItem,
} from "../default-imports";
import { useUpsertVariantsArbitrarily } from "../hooks/variant";
import TooltipContainer from "../tooltip-container";
import { ProductOptionsProps } from "./product-options";

const defaultNameList: { label: string; optionType: OptionType }[] = [
  { label: "Color", optionType: "COLOR" },
  { label: "Package", optionType: "DROP_DOWN" },
  { label: "Size", optionType: "DROP_DOWN" },
];

interface AddEditProductOptionsDialogProps extends ProductOptionsProps {
  previousOptions: ProductOptionSchema[];
  open: boolean;
  setOpen: (open: boolean) => void;
  productOptionToEdit?: ProductOptionSchema;
  onProductOptionUpdate?: (productOption: ProductOptionSchema) => void;
}
export default function AddEditProductOptionsDialog({
  form,
  previousOptions,
  open,
  setOpen,
  productOptionToEdit,
  onProductOptionUpdate,
}: AddEditProductOptionsDialogProps) {
  const [openNamePopover, setOpenNamePopover] = useState(false);
  const { upsertVariants } = useUpsertVariantsArbitrarily(form);
  const form2 = useForm<ProductOptionSchema>({
    resolver: zodResolver(productOptionSchema),
    defaultValues: {
      id: productOptionToEdit?.id || cuid(),
      optionType: productOptionToEdit?.optionType || OptionType.DROP_DOWN,
      name: productOptionToEdit?.name || "",
      choices: productOptionToEdit?.choices || [],
      inStock: productOptionToEdit?.inStock || true,
      visible: productOptionToEdit?.visible || true,
    },
    progressive: true,
  });
  const { remove } = useFieldArray({
    control: form2.control,
    name: `choices`,
  });
  const productOptionsUseFieldArray = useFieldArray({
    control: form.control,
    name: "productOptions",
  });

  const productOptionTypes: Record<
    OptionType,
    { name: string; icon: LucideIcon }
  > = {
    COLOR: { name: "Color", icon: DropletIcon },
    UNSPECIFIED_OPTION_TYPE: { name: "Unspecified", icon: FileQuestion },
    DROP_DOWN: { name: "List", icon: ListIcon },
  };

  function handleFormSubmit(input: ProductOptionSchema) {
    if (!productOptionToEdit) {
      // Adding options
      productOptionsUseFieldArray.append({ ...input, id: cuid() });
      if (form.watch("manageVariants")) {
        upsertVariants([...previousOptions, { ...input, id: cuid() }]);
      }
      form2.reset();
    } else {
      // Updating options
      onProductOptionUpdate && onProductOptionUpdate(input);
      if (form.watch("manageVariants")) {
        const updatedOptions = previousOptions.map((option) =>
          option.id === input.id ? input : option
        );
        upsertVariants(updatedOptions);
      }
    }

    setOpen(false);
  }

  // TODO: implement link for options
  return (
    <ResponsiveDrawer
      open={open}
      setOpen={setOpen}
      title="Add product option"
      description={
        <span>
          {` You'll be able to manage pricing and inventory for this product option later on.`}{" "}
          <Link href={`#`} className="text-primary hover:underline">
            Learn more about options
          </Link>
        </span>
      }
      className="max-w-2xl "
    >
      {/* <pre>{JSON.stringify(productOptionToEdit, null, 2)}</pre>
      <pre className="text-destructive">
        {JSON.stringify(form2.getValues(), null, 2)}
      </pre> */}
      <Form {...form2}>
        <form className="mt-6">
          <div className="flex flex-row gap-3">
            <FormField
              control={form2.control}
              name="name"
              render={({ field }) => (
                <FormItem className="basis-2/3">
                  <div>
                    <TooltipContainer label="Type in an option name">
                      {`Give this option any name you want, like Flavor or Material. It will appear in the product page with the choices you add below.`}
                    </TooltipContainer>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="e.g., Size or Weight"
                      {...field}
                      onClick={() => {
                        if (!field.value) {
                          setOpenNamePopover(true);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  <Popover
                    open={openNamePopover}
                    onOpenChange={setOpenNamePopover}
                  >
                    <PopoverTrigger className="w-full h-0" />
                    <PopoverContent
                      className="p-0"
                      align="start"
                      sideOffset={0}
                    >
                      <Command>
                        <CommandInput className="hidden" value={field.value} />
                        <CommandList>
                          <CommandGroup>
                            {defaultNameList.map((item) => (
                              <CommandItem
                                key={item.label}
                                value={item.label}
                                onSelect={(e) => {
                                  field.onChange(e);
                                  setOpenNamePopover(false);
                                  form2.setValue("optionType", item.optionType);
                                }}
                              >
                                {item.label}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto",
                                    item.label === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                          <CommandEmpty>
                            <CommandSeparator />
                          </CommandEmpty>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form2.control}
              name={`optionType`}
              render={({ field }) => (
                <FormItem className=" basis-1/3">
                  <FormLabel>Show in product page as:</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      value={field.value}
                      onValueChange={(e: OptionType) =>
                        field.onChange(e || "LIST")
                      }
                      variant={"outline"}
                    >
                      {Object.values(OptionType).map((option) => {
                        const Icon = productOptionTypes[option].icon;
                        return (
                          <ToggleGroupItem
                            key={option}
                            value={option}
                            aria-label={`toggle ${option}`}
                            className={cn(
                              option === OptionType.UNSPECIFIED_OPTION_TYPE &&
                                "hidden"
                            )}
                          >
                            <Icon className="size-4 mr-2" />
                            <span> {productOptionTypes[option].name}</span>
                          </ToggleGroupItem>
                        );
                      })}
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form2.control}
            name={`choices`}
            render={({ field }) => {
              const handleInputChange = (
                e: React.ChangeEvent<HTMLInputElement>
              ) => {
                const value = e.target.value;
                if (value.endsWith(",") || value.endsWith("\n")) {
                  const newChoices = value
                    .split(/[\n,]+/)
                    .map((v) => v.trim())
                    .filter((v) => v)
                    .map((choice) => ({
                      id: cuid(),
                      value: choice,
                      description: choice,
                    }));
                  // Combine new choices with existing ones and ensure no duplicates by value
                  const mergedChoices = [
                    ...field.value!.filter(
                      (c: { value: string }) =>
                        !newChoices.some((nc) => nc.value === c.value)
                    ),
                    ...newChoices,
                  ];
                  field.onChange(mergedChoices);
                  e.target.value = "";
                }
              };

              const handleKeyDown = (
                e: React.KeyboardEvent<HTMLInputElement>
              ) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const trimmedValue = e.currentTarget.value.trim();
                  if (trimmedValue) {
                    const newChoice = {
                      id: cuid(),
                      value: trimmedValue,
                      description: trimmedValue, // Default or empty description
                    };

                    const existingValues = field.value || [];
                    if (
                      !existingValues.some(
                        (c: { value: string }) => c.value === trimmedValue
                      )
                    ) {
                      field.onChange([...existingValues, newChoice]);
                    }
                    e.currentTarget.value = ""; // Clear input
                  }
                }
              };

              return (
                <FormItem>
                  <TooltipContainer label="Type in choices for this option">
                    {`Every time you want to save a choice, press Enter or add a comma after it.`}
                  </TooltipContainer>
                  <FormControl>
                    <div className="flex flex-wrap items-center border p-2 pb-0">
                      {field.value?.map((choice, iteration) => (
                        <ChoiceContainer
                          key={choice.id}
                          optionType={form2.watch("optionType")}
                          choice={choice}
                          deleteChoice={() => remove(iteration)}
                        >
                          <FormField
                            control={form2.control}
                            name={`choices.${iteration}.value`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Popover>
                                    <PopoverTrigger className="flex gap-2 items-center">
                                      <div
                                        className="size-5  flex-none   rounded-full  "
                                        style={{
                                          backgroundColor: field.value,
                                        }}
                                      />
                                      <span>{choice.description}</span>
                                    </PopoverTrigger>
                                    <PopoverContent className="flex flex-col items-center gap-3 p-4">
                                      <HexColorPicker
                                        color={field.value || "#000000"}
                                        onChange={field.onChange}
                                      />
                                      <hr className="w-full" />
                                      <div className="flex gap-2">
                                        <Input {...field} className="h-8" />

                                        <div
                                          className="size-8  flex-none border-popover-foreground border"
                                          style={{
                                            backgroundColor: field.value,
                                          }}
                                        />
                                      </div>
                                    </PopoverContent>
                                  </Popover>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </ChoiceContainer>
                      ))}
                      <Input
                        placeholder="Separate choices with commas e.g., Small, Medium, Large,"
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="flex-1 border-none focus-visible:ring-0 h-8 mb-2"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="text-xs">
                    Press Enter or add a comma after each choice.
                  </FormDescription>
                </FormItem>
              );
            }}
          />
          <div className="flex gap-3 mt-6 justify-end items-center">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => form2.handleSubmit(handleFormSubmit)()}
            >
              {!productOptionToEdit ? "Add" : "Update"}
            </Button>
          </div>
        </form>
      </Form>
    </ResponsiveDrawer>
  );
}

interface ChoiceContainerProps {
  optionType: OptionType;
  choice: ChoiceSchema;
  deleteChoice: () => void;
  children?: React.ReactNode;
}
function ChoiceContainer({
  optionType,
  choice,
  deleteChoice,
  children,
}: ChoiceContainerProps) {
  return (
    <Badge className="flex flex-row mb-2 h-8 justify-between items-center gap-2 bg-secondary text-secondary-foreground mr-1">
      {optionType === "COLOR" ? (
        <div>{children}</div>
      ) : (
        <span>{choice.description}</span>
      )}
      <Button
        type="button"
        variant={"ghost"}
        size={"icon"}
        className="p-1 m-0 size-5"
        onClick={deleteChoice}
      >
        <XIcon className="size-3" />
      </Button>
    </Badge>
  );
}
