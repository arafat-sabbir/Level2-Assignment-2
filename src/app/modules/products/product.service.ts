import { TProduct } from './product.interface';
import ProductModel from './product.model';

const addProductToDb = async (product: TProduct) => {
  const newProduct = ProductModel.create(product);
  return newProduct;
};
const getAllProductFromDb = async () => {
  const AllProduct = await ProductModel.find();
  if (!AllProduct.length) {
    throw new Error('No Product Found');
  }
  return AllProduct;
};

const getSingleProductFromDb = async (_id: string) => {
  try {
    const SingleProduct = await ProductModel.findById({ _id });
    if (!SingleProduct) {
      throw new Error('No Product Found');
    }
    return SingleProduct;
  } catch (error) {
    if (error instanceof Error && error.name === 'CastError') {
      throw new Error('No Product Found');
    } else {
      throw new Error('Error updating product');
    }
  }
};

const updateSingleProductFromDb = async (_id: string, data: object) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(_id, data, {
      new: true,
    });
    return updatedProduct;
  } catch (error) {
    if (error instanceof Error && error.name === 'CastError') {
      throw new Error('No Product Found');
    } else {
      throw new Error('Error updating product');
    }
  }
};

const deleteProductFromDb = async (_id: string) => {
  const deletedProduct = await ProductModel.findByIdAndDelete({ _id });
  return deletedProduct;
};

const getSearchProductsFromDb = async (searchTerm: string) => {
  const result = await ProductModel.find({
    $text: { $search: searchTerm },
  });
  if (!result.length) {
    throw new Error(`No Product Found For searchTerm ${searchTerm}`);
  }
  return result;
};

export const ProductService = {
  addProductToDb,
  getAllProductFromDb,
  getSingleProductFromDb,
  updateSingleProductFromDb,
  deleteProductFromDb,
  getSearchProductsFromDb,
};
