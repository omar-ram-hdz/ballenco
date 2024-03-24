import z from "zod";
import { regex } from "../helpers/regex.js";

const currentYear = new Date().getFullYear() - 19;

const userSchema = z.object({
  nombre: z.string({
    invalid_type_error: "Name must be string",
    required_error: "Name is required",
  }),
  year: z
    .number({
      invalid_type_error: "Birth date must be number",
      required_error: "Birth date is required",
    })
    .gte(1900, { message: "The birthday is too long" })
    .lte(new Date().getFullYear() - 18, {
      message: "The birthday is too young",
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
});

export const validateUser = (input) => {
  return userSchema.safeParse(input);
};
export const validatePartialUser = (input) => {
  return userSchema.partial().safeParse(input);
};
