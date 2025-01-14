import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const SignUpSchema = z.object({
  name: z.string().nonempty({ message: "Please enter your name." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .regex(emailRegex, {
      message: "Please use a properly formatted email address.",
    }),
  phone: z.string().nonempty({ message: "Please enter your phone number." }),
  password: z.string().min(6, {
    message: "Please choose a password that is more than 5 characters.",
  }),
});

type SignUpSchema = z.infer<typeof SignUpSchema>;

export { SignUpSchema };
