import ResponsiveDrawer from "@/components/responsive-drawer";
import { UpsertProductSchema } from "@/lib/validation";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Button,
  Checkbox,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../default-imports";
import { useUpsertVariantsArbitrarily } from "../hooks/variant";
import TooltipContainer from "../tooltip-container";

interface ManagePricingAndInventoryProps {
  form: UseFormReturn<UpsertProductSchema>;
}

export default function ManagePricingAndInventory({
  form,
}: ManagePricingAndInventoryProps) {
  const { upsertVariants, deleteVariants } = useUpsertVariantsArbitrarily(form);
  const [open, setOpen] = useState(false);
  return (
    <>
      <FormField
        control={form.control}
        name="manageVariants"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex gap-2 items-center">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(value: CheckedState) => {
                    if (value) {
                      upsertVariants();
                      field.onChange(value);
                    } else {
                      setOpen(true);
                    }
                  }}
                />
                <FormLabel className="flex items-center">
                  <span>
                    Manage pricing and inventory for each product variant
                  </span>
                  <TooltipContainer label="">
                    <p>
                      Variants are combinations of product options, e.g.,{" "}
                      <strong className="font-semibold">
                        small black shirt.
                      </strong>
                    </p>
                  </TooltipContainer>
                </FormLabel>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <ResponsiveDrawer
        title="Reset values for variants"
        open={open}
        setOpen={setOpen}
        className="max-w-md"
      >
        <span>
          {` Any changes you’ve made will reset to original values. Do you want to continue?`}
        </span>
        <div className="w-full flex justify-end gap-3 items-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              // I think that we do not need to delete the variants at all, why? yet to find out
              // deleteVariants();
              form.setValue("manageVariants", false);
              setOpen(false);
            }}
          >
            Ok
          </Button>
        </div>
      </ResponsiveDrawer>
    </>
  );
}
