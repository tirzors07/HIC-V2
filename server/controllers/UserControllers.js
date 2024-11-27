import UserModel from "../models/UserModel.js";

export const getAllUsers = async (req, res) => {
    try {
        const user = await UserModel.findAll(); // Trae todos los usuarios
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios: " + error.message });
    }
};
export const createUser = async (req, res) => {
    const { name_, email, password_, matricula, role } = req.body;
    try {
        // Validación de datos según el rol
        if (role === "hic_admin") {
            if (!email || !password_) {
                return res.status(400).json({
                    message: "Email y contraseña son obligatorios para administradores.",
                });
            }
        } else if (role === "general") {
            if (!matricula) {
                return res.status(400).json({
                    message: "La matrícula es obligatoria para usuarios generales.",
                });
            }
        } else {
            return res.status(400).json({ message: "El rol especificado no es válido." });
        }

        const newUser = await UserModel.create({ name_, email, password_, matricula, role });
        res.status(201).json({
            message: "Usuario registrado exitosamente.",
            user: newUser,
        });
    } catch (error) {
        res.status(400).json({ message: "Error al crear el usuario: " + error.message });
    }
};
export const updateUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        const [updated] = await UserModel.update(req.body, {
            where: { user_id },
        });

        if (updated) {
            const updatedUser = await UserModel.findOne({ where: { user_id } });
            res.status(200).json({
                message: "Usuario actualizado exitosamente.",
                user: updatedUser,
            });
        } else {
            res.status(404).json({ message: "Usuario no encontrado." });
        }
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar el usuario: " + error.message });
    }
};
export const getUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        const user = await UserModel.findOne({
            where: { user_id },
        });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Usuario no encontrado." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario: " + error.message });
    }
};
export const loginUser = async (req, res) => {
    /*Fn para manejo de login en backend*/
    console.log("Solicitud de login recibida");
    const { email, password } = req.body;
    console.log(`Email: ${email}, Password: ${password}`);
    try {
        //Buscar el usuario por correo y contraseña
        const user = await UserModel.findOne({ where: { email : email, password_ : password } });
        console.log("Usuario encontrado:", user);
        if (user) {
            //Si se encuentra el usuario, devolver datos de éxito
            res.status(200).json({
                message: "Login exitoso",
                user: {
                    id: user.user_id,
                    name: user.name_,
                    email: user.email,
                    role: user.role
                }
            });
        } else {
            //Si no se encuentra el usuario, devolver error
            res.status(401).json({ message: "Correo o contraseña incorrectos" });
        }
    } catch (error) {
        console.log("Error en el servidor:", error);
        res.status(500).json({ message: "Error del servidor", error: error.message });
    }
};