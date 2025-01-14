import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const SignInSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .regex(emailRegex, {
      message: "Please use a properly formatted email address.",
    }),
  password: z.string().min(6, {
    message: "Please choose a password that is more than 5 characters.",
  }),
});

type SignInSchema = z.infer<typeof SignInSchema>;

export { SignInSchema };
