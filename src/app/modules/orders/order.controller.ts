import { Request, Response } from 'express';
import orderValidationSchema from './order.zod.validation';
import { OrderService } from './order.service';

const createNewOrder = async (req: Request, res: Response) => {
  try {
    const { email, productId, price, quantity } = req.body;
    const validOrderData = orderValidationSchema.parse({
      email,
      productId: productId,
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
    console.log(err);
    res.status(400).json({
      success: false,
      message:
        (Array.isArray(err.issues) &&
          err.issues.map((issue: any) => issue.message)) ||
        'Error Ordering Product',
      error: err.message,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    let result;
    const { email } = req.query;
    if (email) {
      result = await OrderService.getOrderByEmailFromDb(email as string);
    } else {
      result = await OrderService.getAllOrderFromDb();
    }
    res.status(200).json({
      success: true,
      message: email
        ? 'Orders fetched successfully for user email!'
        : "'Orders fetched successfully!'",
      data: result,
    });
  } catch (err: any) {
    res
      .status(400)
      .json({ success: false, message: 'Error fetching Order!', error: err.message });
  }
};

export { createNewOrder, getAllOrders };
