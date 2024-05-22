import { Document, Types } from 'mongoose';

export interface TOrder extends Document {
  email: string;
  productId: Types.ObjectId;
  price: number;
  quantity: number;
}