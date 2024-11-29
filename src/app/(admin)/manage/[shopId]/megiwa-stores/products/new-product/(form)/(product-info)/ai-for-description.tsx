import { AI_VOICE_TONES as aiTones } from "@/lib/constants";
import { requiredString, UpsertProductSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon, SettingsIcon, StarsIcon } from "lucide-react";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Textarea,
  ToggleGroup,
  ToggleGroupItem,
} from "../default-imports";
import TooltipContainer from "../tooltip-container";

const descriptionSchema = z.object({
  aiDescription: requiredString.max(350),
});

interface AiForDescriptionProps {
  form: UseFormReturn<UpsertProductSchema>;
}
export default function AiForDescription({ form }: AiForDescriptionProps) {
  const [showSheet, setShowSheet] = useState(false);
  const [onSettingsClicked, setOnSettingsClicked] = useState(false);
  return (
    <>
      <Button
        type="button"
        className="text-primary"
        variant={"ghost"}
        onClick={() => setShowSheet(true)}
      >
        <StarsIcon className="mr-2 size-6" />
        <span>Generate AI Text</span>
      </Button>

      <Sheet onOpenChange={setShowSheet} open={showSheet}>
        <SheetContent className=" flex flex-col">
          {!onSettingsClicked && (
            <SheetHeader className="flex flex-row gap-4 justify-between items-center">
              <SheetTitle>AI Text Creator</SheetTitle>
              <Button
                type="button"
                variant={"ghost"}
                size={"icon"}
                onClick={() => setOnSettingsClicked(true)}
              >
                <SettingsIcon className="text-primary" />
              </Button>
            </SheetHeader>
          )}
          {onSettingsClicked && (
            <SheetHeader>
              <div className="flex gap-2 items-center">
                <Button
                  type="button"
                  variant={"ghost"}
                  size={"icon"}
                  onClick={() => setOnSettingsClicked(false)}
                >
                  <ChevronLeftIcon className="text-primary" />
                </Button>
                <SheetClose />
                <SheetTitle>AI Text Creator Settings</SheetTitle>
              </div>
            </SheetHeader>
          )}
          <div className="w-full px-1 flex flex-col gap-8 flex-1 overflow-y-auto scroll-smooth">
            {!onSettingsClicked && <AiFormFields form={form} />}
            {onSettingsClicked && <AiTextCreatorSettings />}
          </div>
          <SheetFooter>
            <SheetDescription>
              {`AI can make mistakes, so double-check that the results are
              accurate before using them.`}
            </SheetDescription>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

function AiFormFields({ form }: AiForDescriptionProps) {
  const form2 = useForm<z.infer<typeof descriptionSchema>>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      aiDescription: "",
    },
  });
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <div className="flex gap-2 items-center justify-between">
              <FormLabel>Product name</FormLabel>
              <span className="text-muted-foreground font-bold">100</span>
            </div>
            <FormControl>
              <Input placeholder="Item name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form2.control}
        name="aiDescription"
        render={({ field }) => (
          <FormItem>
            <div className="flex gap-2 items-center justify-between">
              <TooltipContainer label="Descriptive keywords">
                {`Use specific words and phrases that you want to include in this description.`}
              </TooltipContainer>
              <span className="text-muted-foreground font-bold ms-auto">
                350
              </span>
            </div>
            <FormControl>
              <Textarea
                rows={8}
                placeholder="What would you like customers to know? e.g., Handmade, 100% cotton, suitable for all age groups, great for a gift."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="button" className="w-full mx-auto max-w-fit">
        <StarsIcon className="mr-2 size-4" />
        <span>Create text</span>
      </Button>
    </>
  );
}

function AiTextCreatorSettings() {
  const [selectedTones, setSelectedTones] = useState<string[]>([
    "Professional",
    "Enthusiastic",
    "Informative",
  ]);
  const form2 = useForm<z.infer<typeof descriptionSchema>>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      aiDescription: "",
    },
  });

  const handleChange = (value: string[]) => {
    if (value.length <= 3) {
      setSelectedTones(value);
    } else {
      setSelectedTones((prev) => [
        ...prev.slice(0, 2),
        value[value.length - 1],
      ]);
    }
  };
  return (
    <div className="size-full flex flex-col gap-6">
      <h6>
        These settings will affect the AI text creators across your Dashboard
      </h6>
      <hr />
      <div className="space-y-4">
        <TooltipContainer label="Tone of voice">
          You can choose up to 3 options.
        </TooltipContainer>

        <ToggleGroup
          type="multiple"
          variant={"outline"}
          size={"sm"}
          value={selectedTones}
          onValueChange={handleChange}
          className="flex flex-wrap gap-2 w-full justify-start"
        >
          {aiTones.map((tone) => (
            <ToggleGroupItem
              key={tone}
              value={tone}
              aria-label={`Toggle ${tone}`}
            >
              {tone}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <hr />
      <FormField
        control={form2.control}
        name="aiDescription"
        render={({ field }) => (
          <FormItem>
            <div className="flex gap-2 items-center justify-between">
              <FormLabel>{`What's important to mention?`}</FormLabel>
              <span className="text-muted-foreground font-bold ms-auto">
                350
              </span>
            </div>
            <FormControl>
              <Textarea
                rows={8}
                placeholder="Use specific words(keywords), and phrases about your business for more customized content."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex-1 flex flex-col justify-end items-center">
        <Button type="button">Save Changes</Button>
      </div>
    </div>
  );
}
