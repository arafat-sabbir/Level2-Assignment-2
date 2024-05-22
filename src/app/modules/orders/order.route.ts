import express from 'express';
import { createNewOrder, getAllOrders } from './order.controller';

const router = express.Router();

// Routes to CreateNewOrder
router.post('/', createNewOrder);
// Routes to get AllOrder Or OrderByEmail
router.get('/', getAllOrders);

export default router;
