import express from 'express';
import { addNewProduct, getAllProduct } from './product.controller';
const router = express.Router();

router.post('/', addNewProduct);
router.get('/', getAllProduct);

export default router;
