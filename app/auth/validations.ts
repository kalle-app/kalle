import * as z from "zod"

const messages = {
  noName: "Please enter a name",
  noUsername: "Please enter a username",
  noPassword: "Please enter a password",
  noLink: "Please enter an identifier for your link",
  noDescription: "Please enter a description",
  noLocation: "Please enter a location",
  shortUsername: "Username has to be at least 2 characters",
  invalidEmail: "Please enter a valid email address",
  shortPassword: "Password must contain at least 10 characters",
  longPassword: "Password cannot contain more than 100 characters",
  invalidUrl: "Please enter a valid url",
  invalidNotificationMinutes: "Please leve this field blank or enter a positive number.",
}

export const SignupInput = z.object({
  name: z.string().min(1, { message: messages.noName }),
  username: z.string().min(3, { message: messages.shortUsername }),
  email: z.string().email({ message: messages.invalidEmail }),
  password: z
    .string()
    .min(10, { message: messages.shortPassword })
    .max(100, { message: messages.longPassword }),
})
export type SignupInputType = z.infer<typeof SignupInput>

export const LoginInput = z.object({
  email: z.string().email({ message: messages.invalidEmail }),
  password: z
    .string()
    .min(10, { message: messages.shortPassword })
    .max(100, { message: messages.longPassword }),
})
export type LoginInputType = z.infer<typeof LoginInput>

export const UpdateUserInput = z.object({
  name: z.string().min(1, { message: messages.noName }),
  email: z.string().email({ message: messages.invalidEmail }),
  password: z
    .string()
    .min(10, { message: messages.shortPassword })
    .max(100, { message: messages.longPassword }),
  repeatPassword: z
    .string()
    .min(10, { message: messages.shortPassword })
    .max(100, { message: messages.longPassword }),
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
  name: z.string().min(1, { message: messages.noName }),
  schedule: Schedules,
})
export type ScheduleInputType = z.infer<typeof ScheduleInput>

export const AddCalendarInput = z.object({
  type: z.string(),
  name: z.string().min(1, { message: messages.noName }),
  url: z.string().url({ message: messages.invalidUrl }),
  username: z.string().min(1, { message: messages.noUsername }),
  password: z.string().min(1, { message: messages.noPassword }),
})
export type AddCalendarInputType = z.infer<typeof AddCalendarInput>

export const GeneralInformationInput = z.object({
  name: z.string().min(1, { message: messages.noName }),
  link: z.string().min(1, { message: messages.noLink }),
  description: z.string().min(1, { message: messages.noDescription }),
  location: z.string().min(1, { message: messages.noLocation }),
})
export type GeneralInformationInputType = z.infer<typeof GeneralInformationInput>

export const BookingInput = z.object({
  email: z.string().email({ message: messages.invalidEmail }),
  notificationTime: z.number().nonnegative({ message: messages.invalidNotificationMinutes }),
})
export type BookingInputType = z.infer<typeof BookingInput>
