import { z } from "zod";

const PocketSchema = z.object({
  value: z.number().positive(),
});

export type TPocketSchema = z.infer<typeof PocketSchema>;

export { PocketSchema };
