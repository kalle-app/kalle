import * as z from "zod"

export const SignupInput = z.object({
  name: z.string().min(1, { message: "Please enter a name" }),
  username: z.string().min(3, { message: "Username has to be at least 2 characters" }),
  email: z.string().email({ message: "Please enter valid email address" }),
  password: z
    .string()
    .min(10, { message: "Password must contain at least 10 characters" })
    .max(100, { message: "Password cannot contain more than 100 characters" }),
})
export type SignupInputType = z.infer<typeof SignupInput>

export const LoginInput = z.object({
  email: z.string().email({ message: "Please enter valid email address" }),
  password: z
    .string()
    .min(10, { message: "Password must contain at least 10 characters" })
    .max(100, { message: "Password cannot contain more than 100 characters" }),
})
export type LoginInputType = z.infer<typeof LoginInput>

export const UpdateUserInput = z.object({
  name: z.string().min(1, { message: "Please enter a name" }),
  email: z.string().email({ message: "Please enter valid email address" }),
  password: z
    .string()
    .min(10, { message: "Password must contain at least 10 characters" })
    .max(100, { message: "Password cannot contain more than 100 characters" }),
  repeatPassword: z
    .string()
    .min(10, { message: "Password must contain at least 10 characters" })
    .max(100, { message: "Password cannot contain more than 100 characters" }),
})
export type UpdateUserInputType = z.infer<typeof UpdateUserInput>
