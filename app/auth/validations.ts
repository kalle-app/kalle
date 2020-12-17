import * as z from "zod"

export const SignupInput = z.object({
  name: z.string().min(1, { message: "Please enter a name" }),
  email: z.string().email({ message: "Please enter valid email address" }),
  password: z
    .string()
    .min(10, { message: "Password must contain at least 10 characters" })
    .max(100, { message: "Password cannot contain more than 100 characters" }),
})
export type SignupInputType = z.infer<typeof SignupInput>

export const LoginInput = z.object({
  email: z.string().email(),
  password: z.string(),
})
export type LoginInputType = z.infer<typeof LoginInput>
