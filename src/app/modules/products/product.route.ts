import express from 'express';
import { addNewProduct } from './product.controller';
const router = express.Router();

router.post('/', addNewProduct);

export default router;
