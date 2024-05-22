import z from "zod";

const productValidationSchema = z.object({
  name: z.string({ message: "Name is required" }),
  description: z.string({ message: "Description is required" }),
  price: z.number({ message: "Price is required" }),
  category: z.string({ message: "Category is required" }),
  tags: z
    .string({ message: "Tags is required" })
    .array()
    .nonempty({ message: "Please prive tag name" }),
  variants: z.array(
    z.object({
      type: z.string(),
      value: z.string(),
    }),
    {
      message: "Invalid variants!",
    }
  ),
  inventory: z.object(
    {
      quantity: z.number(),
      inStock: z.boolean(),
    },
    { message: "Invalid inventory!!" }
  ),
});

export default productValidationSchema;
