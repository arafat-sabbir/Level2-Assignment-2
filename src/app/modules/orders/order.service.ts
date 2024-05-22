import { TOrder } from './order.interface';
import OrderModel from './order.model';

const AddNewOrderToDb = async (data: any) => {
  const newOrder = OrderModel.create(data);
  return newOrder;
};

const getAllOrderFromDb = async () => {
    const allOrders = OrderModel.find();
    return allOrders;
  };
  
export const OrderService = { AddNewOrderToDb,getAllOrderFromDb };
