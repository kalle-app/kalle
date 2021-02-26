import * as z from "zod"

const messages = {
  no_name: "Please enter a name",
  no_username: "Please enter a username",
  no_password: "Please enter a password",
  no_link: "Please enter an identifier for your link",
  no_description: "Please enter a description",
  no_location: "Please enter a location",
  short_username: "Username has to be at least 2 characters",
  invalid_email: "Please enter a valid email address",
  short_password: "Password must contain at least 10 characters",
  long_password: "Password cannot contain more than 100 characters",
  invalid_url: "Please enter a valid url",
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

const Schedule = z.object({
  blocked: z.boolean(),
  start: z.string(),
  end: z.string(),
})

const Schedules = z.object({
  monday: Schedule,
  tuesday: Schedule,
  wednesday: Schedule,
  thursday: Schedule,
  friday: Schedule,
  saturday: Schedule,
  sunday: Schedule,
})

export const ScheduleInput = z.object({
  name: z.string().min(1, { message: messages.no_name }),
  schedule: Schedules,
})
export type ScheduleInputType = z.infer<typeof ScheduleInput>

export const AddCalendarInput = z.object({
  type: z.string(),
  name: z.string().min(1, { message: messages.no_name }),
  url: z.string().url({ message: messages.invalid_url }),
  username: z.string().min(1, { message: messages.no_username }),
  password: z.string().min(1, { message: messages.no_password }),
})
export type AddCalendarInputType = z.infer<typeof AddCalendarInput>

export const GeneralInformationInput = z.object({
  name: z.string().min(1, { message: messages.no_name }),
  link: z.string().min(1, { message: messages.no_link }),
  description: z.string().optional(),
  location: z.string().optional(),
})
export type GeneralInformationInputType = z.infer<typeof GeneralInformationInput>
