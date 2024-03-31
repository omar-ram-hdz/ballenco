import z from "zod";

const motionsSchema = z.object({
  origen: z
    .string({
      invalid_type_error: "Origin must be string",
      required_error: "Origin is required",
    })
    .uuid({ message: "Invalid origin" }),
  destiny: z
    .string({
      invalid_type_error: "Destiny must be string",
      required_error: "Destiny is required",
    }),
  monto: z.boolean({
    invalid_type_error: "Amount must be double",
    required_error: "Amount is required",
  }),
});

export const validateMotions = (input) => {
  return motionsSchema.safeParse(input);
};
