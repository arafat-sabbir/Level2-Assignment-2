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

const getOrderByEmailFromDb = async (email: string) => {
    console.log(email);
  const orderByEmail =await OrderModel.find({ email }).exec();
  return orderByEmail;
};

export const OrderService = { AddNewOrderToDb, getAllOrderFromDb,getOrderByEmailFromDb };
