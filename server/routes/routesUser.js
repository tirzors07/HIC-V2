import express from "express";//para facilitar conexion con el servidor
import { getAllUsers, createUser, updateUser, getUser, loginUser } from "../controllers/UserControllers.js";
import { resolveEnvPrefix } from "vite";
const router = express.Router();

router.get('/', getAllUsers);
router.post('/register', createUser);
router.put('/:user_id', updateUser);
router.get('/:user_id', getUser);
router.post('/login', loginUser);  // Ruta para login
export default router;