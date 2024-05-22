import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

// Schema for Order
const OrderSchema = new Schema<TOrder>({
  email: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Order Model
const OrderModel = model<TOrder>('Order', OrderSchema);

// Export The Order Model
export default OrderModel;
