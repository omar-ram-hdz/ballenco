import z from "zod";

const cardsSchema = z.object({
  numero: z
    .number({
      invalid_type_error: "The number must be int",
      required_error: "The number is required",
    })
    .gte(16, { message: "The number must contains 16 digits" })
    .lte(16, {
      message: "The nip must be contains 16 digits",
    }),
  cvv: z
    .number({
      invalid_type_error: "The CVV must be int",
      required_error: "The CVV is required",
    })
    .gte(3, { message: "The CVV must contains 3 digits minimum" })
    .lte(4, {
      message: "The CVV must be contains 4 digits maximum",
    }),
  vencimiento: z
    .date({
      invalid_type_error: "Expiration must be a Date()",
      required_error: "Expiration is required",
    })
    .min(new Date(), { message: "The card is expired" }),
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
