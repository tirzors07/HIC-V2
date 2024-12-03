import express from 'express';
import { getAllMedicamentos, getMedicamento, createMedicamento, updateMedicamento, deleteMedicamento } from "../controllers/MedicamentoControllers.js";

const router = express.Router();

router.get("/medicamentos", getAllMedicamentos);
router.get("/medicamento/:id", getMedicamento);
router.post("/medicamentos", createMedicamento);  // Cambio aquí de /medicamento a /medicamentos
router.put("/medicamento/:id", updateMedicamento);
router.delete("/medicamento/:id", deleteMedicamento);

export default router;
