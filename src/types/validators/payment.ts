import { z } from "zod";

const PaymentSchema = z.object({
  address: z.string().min(10, { message: "enter at least 10 characters " }),
  description: z.string().optional(),
});

export type TPaymentSchema = z.infer<typeof PaymentSchema>;

export { PaymentSchema };
