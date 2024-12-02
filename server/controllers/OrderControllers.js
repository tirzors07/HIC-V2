import OrderModel from "../models/OrderModel.js";
import UserModel from "../models/UserModel.js";

// Obtener todos los pedidos
export const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.findAll();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Obtener un pedido especifico
export const getOneOrder = async (req, res) => {
    const { order_id } = req.params; // Parámetro de la URL
    try {
        const order = await OrderModel.findOne({ where: { order_id: order_id } });

        if (!order) {
            return res.status(404).json({ 
                success: false, 
                message: "Orden no encontrada" // Asegurarse de que el pedido no esté vacío
            });
        }

        const order_user = await UserModel.findOne({ where: { user_id: order.user_id } });

        if (!order_user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado" // Validar que el usuario asociado exista
            });
        }

        res.status(200).json({
            success: true,
            order: {
                order_id: order.order_id,
                username: order_user.name_,
                user_id: order.user_id,
                state: order.state,
                order_date: order.order_date,
                delivery_schedule: order.delivery_schedule,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al buscar la orden",
            error: error.message, // Detalle del error para depuración
        });
    }
};
export const createOrder = async (req, res) => {
    const { user_id, prescription_id } = req.body; // ahora debes incluir prescription_id en el body

    try {
        // Verificar si el user_id existe en la base de datos
        const userExists = await UserModel.findByPk(user_id);
        if (!userExists) {
            return res.status(404).json({ message: "El usuario no existe" });
        }

        // Verificar si la receta existe
        const prescriptionExists = await PrescriptionModel.findByPk(prescription_id);
        if (!prescriptionExists) {
            return res.status(404).json({ message: "Receta no encontrada" });
        }

        // Crear el pedido
        const newOrder = await OrderModel.create({
            user_id,
            prescription_id,
            state: 'Confirmed', // El estado inicial puede ser 'Confirmed' o cualquier valor que se ajuste a tu flujo
        });

        res.status(201).json({
            message: "Pedido creado",
            success: true,
            order: {
                order_id: newOrder.order_id,
                order_date: newOrder.order_date,
                state: newOrder.state,
                user_id: newOrder.user_id,
                delivery_schedule: newOrder.delivery_schedule,
                prescription_id: newOrder.prescription_id
            }
        });
    } catch (error) {
        console.error("Error al crear el pedido:", error);
        res.status(400).json({ message: error.message });
    }
};

// Actualizar el estado de un pedido
export const updateOrder = async (req, res) => {
    try {
        const [updated] = await OrderModel.update(req.body, {
            where: { order_id: req.params.id },
        });

        if (updated) {
            const updatedOrder = await OrderModel.findOne({
                where: { order_id: req.params.id },
            });
            res.status(200).json({
                message: "Pedido actualizado",
                order: updatedOrder,
            });
        } else {
            res.status(404).json({ message: "Pedido no encontrado" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Eliminar un pedido
export const deleteOrder = async (req, res) => {
    try {
        const deleted = await OrderModel.destroy({
            where: { order_id: req.params.id },
        });

        if (deleted) {
            res.status(200).json({ message: "Pedido eliminado" });
        } else {
            res.status(404).json({ message: "Pedido no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
