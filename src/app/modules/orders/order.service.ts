import { ProductService } from '../products/product.service';
import { TOrder } from './order.interface';
import OrderModel from './order.model';

const AddNewOrderToDb = async (data:any): Promise<TOrder> => {
  const Product = await ProductService.getSingleProductFromDb(
    String(data.productId),
  );
  const availAbleQuantity: number = <number>Product?.inventory.quantity;
  const updatedQuantity = availAbleQuantity - data.quantity;
  if (availAbleQuantity < 0 || updatedQuantity < 0) {
    await ProductService.updateSingleProductFromDb(String(data.productId), {
      'inventory.inStock': false,
    });
    throw new Error('Insufficient quantity available in inventory');
  }
  if (data.quantity > availAbleQuantity) {
    throw new Error('Insufficient quantity available in inventory');
  }
  const newOrder = await OrderModel.create(data);
  await ProductService.updateSingleProductFromDb(String(data.productId), {
    'inventory.quantity': updatedQuantity,
  });
  return newOrder;
};

const getAllOrderFromDb = async () => {
  const allOrders = await OrderModel.find();
  if (!allOrders.length) {
    throw new Error('Order not found');
  }
  return allOrders;
};

const getOrderByEmailFromDb = async (email: string) => {
  const orderByEmail = await OrderModel.find({ email }).exec();
  if (!orderByEmail.length) {
    throw new Error('Order not found');
  }
  return orderByEmail;
};

export const OrderService = {
  AddNewOrderToDb,
  getAllOrderFromDb,
  getOrderByEmailFromDb,
};
