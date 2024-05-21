import { z } from 'zod';

const VariantValidationSchema = z.object({
  type: z.string().nonempty({ message: "Type is required and cannot be empty" }),
  value: z.string().nonempty({ message: "Value is required and cannot be empty" }),
});

const InventoryValidationSchema = z.object({
  quantity: z.number({
    required_error: "Quantity is required",
    invalid_type_error: "Quantity must be a number",
  }),
  inStock: z.boolean({
    required_error: "InStock is required",
    invalid_type_error: "InStock must be a boolean",
  }),
});

const ProductValidationSchema = z.object({
  name: z.string().nonempty({ message: "Name is required and cannot be empty" }),
  description: z.string().nonempty({ message: "Description is required and cannot be empty" }),
  price: z.number({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number",
  }),
  category: z.string().nonempty({ message: "Category is required and cannot be empty" }),
  tags: z.array(z.string().nonempty({ message: "Tag cannot be empty" }), {
    required_error: "Tags are required",
    invalid_type_error: "Tags must be an array of strings",
  }),
  variants: z.array(VariantValidationSchema, {
    required_error: "Variants are required",
    invalid_type_error: "Variants must be an array of variant objects",
  }),
  inventory: InventoryValidationSchema,
});

type TProduct = z.infer<typeof ProductValidationSchema>;

export { ProductValidationSchema, TProduct };
