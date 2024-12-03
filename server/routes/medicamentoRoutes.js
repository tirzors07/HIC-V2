import express from "express";//para facilitar conexion con el servidor
import { createMedicamento } from "../controllers/MedicamentoControllers.js";
import { resolveEnvPrefix } from "vite";
const router = express.Router();

router.post('/new_med', createMedicamento);

export default router;