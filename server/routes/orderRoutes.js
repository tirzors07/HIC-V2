import express from "express";//para facilitar conexion con el servidor
import { getAllOrders, getOneOrder, createOrder, updateOrder, deleteOrder } from "../controllers/OrderControllers.js";
import { resolveEnvPrefix } from "vite";

const router = express.Router();

router.get('/get_orders', getAllOrders);
router.get("/find_order/:order_id", getOneOrder);
router.post('/new_order', createOrder);
router.put('/update_order/:order_id', updateOrder);
router.get('/delete_order/:user_id', deleteOrder);

export default router;