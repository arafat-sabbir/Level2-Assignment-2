import { Request, Response } from 'express';
import orderValidationSchema from './order.zod.validation';
import { OrderService } from './order.service';
import { Types } from 'mongoose';

const createNewOrder = async (req: Request, res: Response) => {
  try {
    const { email, productId, price, quantity } = req.body;
    const validOrderData = orderValidationSchema.parse({
      email,
      productId: new Types.ObjectId(productId),
      price,
      quantity,
    });
    const newOrder = await OrderService.AddNewOrderToDb(validOrderData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: newOrder,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message:
        err.issues.map((issue: any) => issue.message) ||
        'Error Ordering Product',
      error: err,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const allOrder = await OrderService.getAllOrderFromDb();
    res
      .status(200)
      .json({
        success: true,
        message: 'Orders fetched successfully!',
        data: allOrder,
      });
  } catch (err: any) {
    res
      .status(400)
      .json({ success: false, message: 'Error fetching Order!', error: err });
  }
};

export { createNewOrder,getAllOrders };
