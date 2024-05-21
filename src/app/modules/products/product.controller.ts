import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { ProductValidationSchema } from './product.zod.validation';

const addNewProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const zodParseProduct = ProductValidationSchema.parse(productData);
    const newProduct = await ProductService.addProductToDb(zodParseProduct);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: newProduct,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Error Creating Product',
      error: err.message,
    });
  }
};

export { addNewProduct };
