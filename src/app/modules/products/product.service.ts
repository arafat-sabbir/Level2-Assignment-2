import { TProduct } from './product.interface';
import ProductModel from './product.model';

const addProductToDb = async (product: TProduct) => {
  const newProduct = ProductModel.create(product);
  return newProduct;
};
const getAllProductFromDb = async () => {
  const newProduct = ProductModel.find();
  return newProduct;
};

export const ProductService = { addProductToDb, getAllProductFromDb };
