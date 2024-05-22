import { Schema, Document, model } from 'mongoose';
import { TOrder } from './order.interface';

export interface OrderDocument extends Document, TOrder {}

const OrderSchema = new Schema<OrderDocument>({
  email: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const OrderModel = model<OrderDocument>('Order', OrderSchema);
export default OrderModel;
