import { z } from 'zod';
import { Types } from 'mongoose';

// Custom validator for ObjectId
const objectIdSchema = z.custom<Types.ObjectId>(
  val => {
    return Types.ObjectId.isValid(val);
  },
  {
    message: 'Invalid ObjectId',
  },
);

// Define the Zod schema for TOrder
const orderValidationSchema = z.object({
  email: z.string().email().nonempty('Email is required'),
  productId: objectIdSchema,
  price: z.number().positive('Price must be a positive number'),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
});

export default orderValidationSchema;
