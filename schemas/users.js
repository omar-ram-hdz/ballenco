import z from "zod";
import { regex } from "../helpers/regex.js";

const currentYear = new Date().getFullYear() - 19;

const userSchema = z.object({
  name: z.string({
    invalid_type_error: "Name must be string",
    required_error: "Name is required",
  }),
  fecha_nacimiento: z
    .date({
      invalid_type_error: "Birth date must be Date()",
      required_error: "Birth date is required",
    })
    .min(new Date("1900-01-01"), { message: "The birth day is too old" })
    .max(new Date(`${currentYear}-12-29`), {
      message: "The birth day is too young",
    }),
  mail: z
    .string({
      invalid_type_error: "Mail must be string",
      required_error: "Mail is required",
    })
    .regex(regex.mail, { message: "Invalid mail" }),
  pass: z
    .string({
      invalid_type_error: "Password must be string",
      required_error: "Password is required",
    })
    .regex(regex.password.min, {
      message: "The password must contains 8 characters minimum",
    })
    .regex(regex.password.upper, {
      message: "The password must contains 1 upper character minimum",
    })
    .regex(regex.password.lower, {
      message: "The password must contains 1 lower character minimum",
    })
    .regex(regex.password.number, {
      message: "The password must contains 1 number minimum",
    })
    .regex(regex.password.spaces, {
      message: "The password never must contains white spaces",
    })
    .regex(regex.password.special, {
      message: "The password must contains 1 special character minimum",
    }),
  nip: z
    .number({
      invalid_type_error: "The nip must be a number",
      required_error: "Nip is required",
    })
    .gte(4, { message: "The nip must contains 4 digits" })
    .lte(4, {
      message: "The nip must be contains 4 digits",
    }),
});

export const validateUser = (input) => {
  return userSchema.safeParse(input);
};
export const validatePartialUser = (input) => {
  return userSchema.partial().safeParse(input);
};
