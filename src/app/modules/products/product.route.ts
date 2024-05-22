import express from 'express';
import {
  addNewProduct,
  getAllProduct,
  getSingleProductById,
  updateSingleProductById,
} from './product.controller';
const router = express.Router();

router.post('/', addNewProduct);
router.get('/', getAllProduct);
router.get('/:productId', getSingleProductById);
router.put('/:productId', updateSingleProductById);

export default router;
