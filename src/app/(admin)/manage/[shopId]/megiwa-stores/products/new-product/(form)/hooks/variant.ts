import { ProductOptionSchema, UpsertProductSchema } from "@/lib/validation";
import { useCallback } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

function generateCombinations(
  options: ProductOptionSchema[]
): Array<Record<string, string>> {
  const choices: Record<string, string[]> = {};
  options.forEach((option) => {
    choices[option.name] = option.choices.map((choice) => choice.value);
  });

  const keys = Object.keys(choices);
  return keys.reduce((acc: Record<string, string>[], key) => {
    const values = choices[key];
    return acc.length === 0
      ? values.map((val) => ({ [key]: val }))
      : acc.flatMap((combo) => values.map((val) => ({ ...combo, [key]: val })));
  }, []);
}

export function useUpsertVariantsArbitrarily(
  form: UseFormReturn<UpsertProductSchema>
) {
  const watchedOptions = form.watch("productOptions");
  const variantsUseFieldArray = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const upsertVariants = useCallback(
    (formOptions?: ProductOptionSchema[]) => {
      const options = formOptions || watchedOptions;
      const combinations = generateCombinations(options);
      const variants = combinations.map((combo) => {
        const choiceIds = options.map(
          (option) =>
            option.choices.find((choice) => choice.value === combo[option.name])
              ?.id
        );

        const id = choiceIds.join("-"); // Create a unique ID based on combined choices

        return {
          id,
          choices: combo,
          stock: {
            id,
            trackQuantity: true,
            quantity: 0,
            inStock: false,
          },
          variant: {
            id,
            priceData: form.watch("priceData"),
            convertedPriceData: form.watch("priceData"),
            costAndProfitData: form.watch("costAndProfitData"),
            weight: 0,
            sku: "",
            visible: true,
          },
        };
      });
      variantsUseFieldArray.replace(variants);
    },
    [form, variantsUseFieldArray, watchedOptions]
  );

  const deleteVariants = useCallback(() => {
    variantsUseFieldArray.remove();
  }, [variantsUseFieldArray]);

  return { upsertVariants, deleteVariants };
}
