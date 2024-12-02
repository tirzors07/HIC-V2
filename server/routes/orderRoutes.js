import express from 'express';
import { createOrder, getAllOrders, getOneOrder, updateOrder, deleteOrder } from "../controllers/OrderControllers.js";

const router = express.Router();

router.post('/order', createOrder);
router.get('/', getAllOrders);
router.get('/:order_id', getOneOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;