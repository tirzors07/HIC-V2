import MessageModel from "../models/MessageModel.js";

export const createMsg = async (req, res) => {
    const { sender_id, receiver_id, msg_content } = req.body;
    try {
        const newMsg = await MessageModel.create({ sender_id, receiver_id, msg_content });
        res.status(200).json({
            success: true,
            msg: "Mensaje creado exitosamente",
            message: {
                sender_id: newMsg.sender_id,
                receiver_id: newMsg.receiver_id,
                msg_content: newMsg.msg_content,
                msg_date: newMsg.msg_date,
            }
        });
    } catch (error) {
        res.status(400).json({ message: "Error al crear el mensaje: " + error.message });
    }
};