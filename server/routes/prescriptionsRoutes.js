import express from "express";//para facilitar conexion con el servidor
import { getAllPrescriptions, getPrescription, createPrescription, updatePrescription, deletePrescription, uploadImage } from "../controllers/PrescriptionControllers.js";
import { resolveEnvPrefix } from "vite";
const router = express.Router();

router.get('/', getAllPrescriptions);
router.get('/', getPrescription);
router.put('/', updatePrescription);
router.delete('/', deletePrescription);
router.post('/', uploadImage, createPrescription);

export default router;