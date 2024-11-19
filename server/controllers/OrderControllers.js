import OrderModel from "../models/OrderModel.js";
// Obtener todos los pedidos
export const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.findAll();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Crear un nuevo pedido
export const createOrder = async (req, res) => {
    const { user_id, prescription_id, state, delivery_schedule } = req.body;

    try {
        const newOrder = await OrderModel.create({
            user_id,
            prescription_id,
            state,
            delivery_schedule,
        });

        res.status(201).json({
            message: "Pedido creado",
            order: newOrder,
        });
    } catch (error) {
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
