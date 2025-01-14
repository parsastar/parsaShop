import { z } from "zod";

const CategorySchema = z.object({
  name: z.string().min(3, { message: "Please at least insert 3 characters" }),
});

type CategorySchema = z.infer<typeof CategorySchema>;

export { CategorySchema };



