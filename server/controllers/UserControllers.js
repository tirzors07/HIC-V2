import UserModel from "../models/UserModel.js";

// Comando para obtener todos los usuarios de forma JSON
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll(); // Cambié "Users" a "users" para mantener la convención de nombres
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Se crea un registro de usuario
export const createUser = async (req, res) => {
    const { name_, email, password_, matricula, role } = req.body;

    try {
        // Validación básica según el rol
        if (role === 'hic_admin') {
            // Para administradores, se requiere email y password
            if (!email || !password_) {
                return res.status(400).json({ message: 'Email y contraseña son requeridos para administradores.' });
            }
        } else if (role === 'general') {
            // Para usuarios generales, se requiere matricula
            if (!matricula) {
                return res.status(400).json({ message: 'Matrícula es requerida para usuarios generales.' });
            }
        } else {
            return res.status(400).json({ message: 'Rol no válido.' });
        }

        const newUser = await UserModel.create(req.body);
        res.status(201).json({
            message: 'Registro creado',
            user: newUser, // Incluyendo el usuario creado en la respuesta
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Se actualiza un usuario en específico
export const updateUser = async (req, res) => {
    try {
        const [updated] = await UserModel.update(req.body, {
            where: { user_id: req.params.id }, // Usar user_id en lugar de id
        });

        if (updated) {
            const updatedUser = await UserModel.findOne({ where: { user_id: req.params.id } });
            res.status(200).json({
                message: 'Registro actualizado',
                user: updatedUser,
            });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Se obtiene un usuario en específico
export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            where: { user_id: req.params.id }, // Usar user_id en lugar de id
        });

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};