import express from "express";//para facilitar conexion con el servidor
import { createMsg } from "../controllers/MessageController.js";
import { resolveEnvPrefix } from "vite";
const router = express.Router();

router.post('/new_msg', createMsg);
export default router;