import avatarUrl from "@/assets/avatar/product-options.png";
import ResponsiveDrawer from "@/components/responsive-drawer";
import Badge from "@/components/ui/badge";
import { FormDescription } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ChoiceSchema, UpsertProductSchema } from "@/lib/validation";
import { OptionType } from "@prisma/client";
import cuid from "cuid";
import {
  DropletIcon,
  FileQuestion,
  ListIcon,
  LucideIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import {
  useFieldArray,
  UseFieldArrayReturn,
  UseFormReturn,
} from "react-hook-form";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
  ToggleGroup,
  ToggleGroupItem,
} from "./default-imports";
import TooltipContainer from "./tooltip-container";

interface ProductOptionsProps {
  form: UseFormReturn<UpsertProductSchema>;
}
// TODO: implement the pop up dialog
export default function ProductOptions({ form }: ProductOptionsProps) {
  const [open, setOpen] = useState(false);
  const watchedProductOptions = form.watch("productOptions");
  const [currentIndex, setCurrentIndex] = useState(
    !watchedProductOptions ? 0 : watchedProductOptions.length
  );
  const choicesFieldArray = useFieldArray({
    control: form.control,
    name: `productOptions.${currentIndex}.choices`,
  });
  return (
    <>
      <Card>
        <CardHeader className="flex-row justify-between gap-4">
          <div className="flex flex-col gap-3 basis-2/3">
            <CardTitle>Product options</CardTitle>
            <CardDescription>
              Does your product come in different options, like size, color or
              material? Add them here.
            </CardDescription>
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
        <CardContent></CardContent>
        <CardFooter>
          <Button
            type="button"
            onClick={() => {
              setCurrentIndex(watchedProductOptions.length);
              setOpen(true);
            }}
          >
            <PlusIcon className="mr-2 size-4" />
            <span>Add options</span>
          </Button>
        </CardFooter>
      </Card>

      <AddProductOptionsDialog
        open={open}
        setOpen={setOpen}
        form={form}
        index={currentIndex}
        choicesFieldArray={choicesFieldArray}
      />
    </>
  );
}

interface AddProductOptionsDialogProps extends ProductOptionsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  index: number;
  choicesFieldArray: UseFieldArrayReturn<UpsertProductSchema>;
}
function AddProductOptionsDialog({
  form,
  open,
  setOpen,
  index,
  choicesFieldArray,
}: AddProductOptionsDialogProps) {
  const { append, remove } = choicesFieldArray;
  const watchedChoices = form.watch(`productOptions.${index}.choices`);

  const productOptionTypes: Record<
    OptionType,
    { name: string; icon: LucideIcon }
  > = {
    COLOR: { name: "Color", icon: DropletIcon },
    UNSPECIFIED_OPTION_TYPE: { name: "Unspecified", icon: FileQuestion },
    DROP_DOWN: { name: "List", icon: ListIcon },
  };

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
      className="max-w-2xl"
    >
      <div className="flex gap-3">
        <FormField
          control={form.control}
          name={`productOptions.${index}.name`}
          render={({ field }) => (
            <FormItem className="basis-2/3">
              <TooltipContainer label="Type in an option name ">
                {`Give this option any name you want, like Flavor or Material. It
                will appear in the product page with the choices you add below.`}
              </TooltipContainer>
              <FormControl>
                <Input placeholder="e.g., Size or Weight" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`productOptions.${index}.optionType`}
          render={({ field }) => (
            <FormItem className=" basis-1/3">
              <FormLabel>Show in product page as:</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="single"
                  defaultValue={field.value}
                  onChange={field.onChange}
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
        control={form.control}
        name={`productOptions.${index}.choices`}
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

          const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
                  {watchedChoices &&
                    watchedChoices.map((choice, iteration) => (
                      <ChoiceContainer
                        key={choice.id}
                        choice={choice}
                        deleteChoice={() => remove(iteration)}
                      >
                        <FormField
                          control={form.control}
                          name={`productOptions.${index}.choices.${iteration}.value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Popover defaultOpen>
                                  <PopoverTrigger>
                                    <div
                                      className="size-5  rounded-full  flex-none border"
                                      style={{ backgroundColor: field.value }}
                                    />
                                  </PopoverTrigger>
                                  <PopoverContent className="flex flex-col items-center gap-3">
                                    <HexColorPicker
                                      color={field.value || "#000000"}
                                      onChange={field.onChange}
                                    />
                                    <div className="flex gap-2">
                                      <Input {...field} />
                                      <div
                                        className="size-10 rounded-full flex-none border"
                                        style={{ backgroundColor: field.value }}
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
    </ResponsiveDrawer>
  );
}

interface ChoiceContainerProps {
  choice: ChoiceSchema;
  deleteChoice: () => void;
  children?: React.ReactNode;
}
function ChoiceContainer({
  choice,
  deleteChoice,
  children,
}: ChoiceContainerProps) {
  return (
    <Badge className="flex flex-row mb-2 h-8 justify-between items-center gap-2 bg-secondary text-secondary-foreground mr-1">
      {children}
      <span>{choice.description}</span>
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
