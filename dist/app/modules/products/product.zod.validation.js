"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidationSchema = void 0;
const zod_1 = require("zod");
const VariantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, { message: "Type is required and cannot be empty" }),
    value: zod_1.z.string().min(1, { message: "Value is required and cannot be empty" }),
});
const InventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number({
        required_error: "Quantity is required",
        invalid_type_error: "Quantity must be a number",
    }),
    inStock: zod_1.z.boolean({
        required_error: "InStock is required",
        invalid_type_error: "InStock must be a boolean",
    }),
});
const ProductValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name is required and cannot be empty" }),
    description: zod_1.z.string().min(1, { message: "Description is required and cannot be empty" }),
    price: zod_1.z.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
    }),
    category: zod_1.z.string().min(1, { message: "Category is required and cannot be empty" }),
    tags: zod_1.z.array(zod_1.z.string().min(1, { message: "Tag cannot be empty" }), {
        required_error: "Tags are required",
        invalid_type_error: "Tags must be an array of strings",
    }),
    variants: zod_1.z.array(VariantValidationSchema, {
        required_error: "Variants are required",
        invalid_type_error: "Variants must be an array of variant objects",
    }),
    inventory: InventoryValidationSchema,
});
exports.ProductValidationSchema = ProductValidationSchema;
