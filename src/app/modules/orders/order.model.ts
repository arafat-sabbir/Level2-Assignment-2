import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

const OrderSchema = new Schema<TOrder>({
  email: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const OrderModel = model('Order', OrderSchema);
export default OrderModel;
