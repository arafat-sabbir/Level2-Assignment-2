import { TProduct } from './product.interface';
import ProductModel from './product.model';

const addProductToDb = async (product: TProduct) => {
  const newProduct = ProductModel.create(product);
  return newProduct;
};
const getAllProductFromDb = async () => {
  const AllProduct = ProductModel.find();
  return AllProduct;
};

const getSingeProductFromDb = async (_id: string) => {
  const SingleProduct = await ProductModel.findById({ _id });
  return SingleProduct;
};

const updateSingleProductFromDb = async (_id: string, data: object) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      _id,
      data,
      { new: true }
    );
    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};


export const ProductService = {
  addProductToDb,
  getAllProductFromDb,
  getSingeProductFromDb,
  updateSingleProductFromDb,
};
