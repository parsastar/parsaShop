import { z } from "zod";

export const ProductSchema = z.object({
  imageFile: z
    .any()
    .refine((file) => {
      if (!file) {
        return true;
      }
      if (
        file instanceof File &&
        ["image/png", "image/jpeg", "image/jpg", "image/*"].includes(file.type)
      ) {
        return true;
      }
      return false;
    }, "فایل باید یک تصویر معتبر باشد (PNG یا JPG)")
    .optional(),
  name: z.string().min(3, { message: "Please at least insert 3 characters" }),
  description: z.string().optional(),
  price: z.number().positive({ message: "Price must be a positive number" }),
  categoryId: z.string(),
  count: z
    .number()
    .int()
    .positive({ message: "Count must be a positive integer" }),
  image: z.string().optional(),
});

export type TProductSchema = z.infer<typeof ProductSchema>;
