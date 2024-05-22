import express from 'express';
import { createNewOrder, getAllOrders } from './order.controller';

const router = express.Router();

router.post('/', createNewOrder);
router.get('/', getAllOrders);

export default router;
