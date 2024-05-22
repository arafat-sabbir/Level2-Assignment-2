import express from 'express';
import { createNewOrder } from './order.controller';

const router = express.Router();

router.post('/', createNewOrder);

export default router;