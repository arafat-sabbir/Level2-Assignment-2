"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
// Custom validator for ObjectId
const objectIdSchema = zod_1.z.custom(val => {
    return mongoose_1.Types.ObjectId.isValid(val) && val instanceof mongoose_1.Types.ObjectId;
}, {
    message: 'Invalid ObjectId',
});
// Define the Zod schema for TOrder
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email().nonempty('Email is required'),
    productId: objectIdSchema,
    price: zod_1.z.number().positive('Price must be a positive number'),
    quantity: zod_1.z.number().int().positive('Quantity must be a positive integer'),
});
exports.default = orderValidationSchema;
