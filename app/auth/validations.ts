import * as z from "zod"

const messages = {
  no_name: "Please enter a name",
  short_username: "Username has to be at least 2 characters",
  invalid_email: "Please enter a valid email address",
  short_password: "Password must contain at least 10 characters",
  long_password: "Password cannot contain more than 100 characters",
}

export const SignupInput = z.object({
  name: z.string().min(1, { message: messages.no_name }),
  username: z.string().min(3, { message: messages.short_username }),
  email: z.string().email({ message: messages.invalid_email }),
  password: z
    .string()
    .min(10, { message: messages.short_password })
    .max(100, { message: messages.long_password }),
})
export type SignupInputType = z.infer<typeof SignupInput>

export const LoginInput = z.object({
  email: z.string().email({ message: messages.invalid_email }),
  password: z
    .string()
    .min(10, { message: messages.short_password })
    .max(100, { message: messages.long_password }),
})
export type LoginInputType = z.infer<typeof LoginInput>

export const UpdateUserInput = z.object({
  name: z.string().min(1, { message: messages.no_name }),
  email: z.string().email({ message: messages.invalid_email }),
  password: z
    .string()
    .min(10, { message: messages.short_password })
    .max(100, { message: messages.long_password }),
  repeatPassword: z
    .string()
    .min(10, { message: messages.short_password })
    .max(100, { message: messages.long_password }),
})
export type UpdateUserInputType = z.infer<typeof UpdateUserInput>
