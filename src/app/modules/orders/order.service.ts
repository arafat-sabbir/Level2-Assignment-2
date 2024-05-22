import { TOrder } from './order.interface';
import OrderModel from './order.model';

const AddNewOrderToDb = async (data: any) => {
  const newOrder = OrderModel.create(data);
  return newOrder;
};

export const OrderService = { AddNewOrderToDb };
