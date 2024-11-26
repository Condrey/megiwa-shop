import { z } from "zod";

export const requiredString = z.string().trim().min(1, "Required");
export const requiredNumber = z.number().min(1, "Required");

// Product
export const upsertProductSchema = z.object({
  id: z.string().trim().optional(),
  name: requiredString,
  ribbon: z.string().trim().optional(),
  description: z
    .string()
    .trim()
    .min(40, "Description must be at least 40 characters.")
    .max(1001, "Your description is ver long.")
    .optional(),
  price: requiredNumber,
});
export type UpsertProductSchema = z.infer<typeof upsertProductSchema>;
