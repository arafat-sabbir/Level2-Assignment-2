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
      message:
        err.issues.map((issue: any) => issue.message) ||
        'Error Creating Product',
      error: err,
    });
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getAllProductFromDb();
    res.status(200).json({
      success: true,
      message: 'Product Fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message:
        err.issues.map((issue: any) => issue.message) ||
        'Error Fetching Products',
      error: err,
    });
  }
};

const getSingleProductById = async (req: Request, res: Response) => {
  try {
    const _id = req.params.productId;
    const singleProduct = await ProductService.getSingleProductFromDb(_id);
    res.status(200).json({
      success: true,
      message: 'Product Fetched successfully!',
      data: singleProduct,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message:'Error Fetching Products',
      error: err,
    });
  }
};

const updateSingleProductById = async (req: Request, res: Response) => {
  try {
    const _id = req.params.productId;
    const newData = req.body;
    const updatedProduct = await ProductService.updateSingleProductFromDb(
      _id,
      newData,
    );
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: updatedProduct,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message:'Error Updating Products',
      error: err,
    });
  }
};

const deleteSingleProduct = async (req: Request, res: Response) => {
 try{
  const _id = req.params.productId;
  const result = await ProductService.deleteProductFromDb(_id);
  res.status(200).json({
    success: true,
    message: 'Product deleted successfully!',
    data: null,
  });
 }catch(err:any){
  res.status(400).json({
    success: false,
    message:'Error While Deleting Products',
    error: err,
  });
 }
};

export {
  addNewProduct,
  getAllProduct,
  getSingleProductById,
  updateSingleProductById,
  deleteSingleProduct
};
