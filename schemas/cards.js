import z from "zod";

const cardsSchema = z.object({
  numero: z
    .string({
      invalid_type_error: "The number must be int",
      required_error: "The number is required",
    })
    .min(16, { message: "The number must contains 16 digits" })
    .max(16, {
      message: "The card must be contains 16 digits",
    }),
  cvv: z
    .string({
      invalid_type_error: "The CVV must be int",
      required_error: "The CVV is required",
    })
    .min(3, { message: "The CVV must contains 3 digits minimum" })
    .max(4, {
      message: "The CVV must be contains 4 digits maximum",
    }),
  year: z
    .number({
      invalid_type_error: "Year expiration must be int",
      required_error: "Year expiration is required",
    })
    .min(new Date().getFullYear(), { message: "The card is expired" }),
  month: z.number({
    invalid_type_error: "Month expiration must be Int",
    required_error: "Month expiration is required",
  }),
  user: z
    .string({
      invalid_type_error: "User must be string",
      required_error: "User is required",
    })
    .uuid({ message: "Invalid user" }),
});

export const validateCard = (input) => {
  return cardsSchema.safeParse(input);
};
