import { ProductService } from '../products/product.service';
import { TOrder } from './order.interface';
import OrderModel from './order.model';

const AddNewOrderToDb = async (data: TOrder): Promise<TOrder> => {
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
  console.log(email);
  const query = { email };
  const OrderByEmail = await OrderModel.find(query);
  return OrderByEmail;
};

export const OrderService = {
  AddNewOrderToDb,
  getAllOrderFromDb,
  getOrderByEmailFromDb,
};
