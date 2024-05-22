import express from 'express';
import {
  addNewProduct,
  deleteSingleProduct,
  getAllProduct,
  getSingleProductById,
  updateSingleProductById,
} from './product.controller';
const router = express.Router();

router.post('/', addNewProduct);
router.get('/', getAllProduct);
router.get('/:productId', getSingleProductById);
router.put('/:productId', updateSingleProductById);
router.delete('/:productId', deleteSingleProduct);

export default router;
