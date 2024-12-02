import UserModel from "../models/UserModel.js";
import OrderModel from "../models/OrderModel.js";
import MessageModel from "../models/MessageModel.js";

UserModel.hasOne(OrderModel, {
    foreignKey: "user_id"
});

OrderModel.belongsTo(UserModel, {
    foreignKey: "user_id"
});

UserModel.hasMany(MessageModel, {
    foreignKey: "sender_id",
    as: "SentMessages"
});

UserModel.hasMany(MessageModel, {
    foreignKey: "receiver_id",
    as: "ReceivedMessages"
});

MessageModel.belongsTo(UserModel, {
    foreignKey: "sender_id",
    as: "Sender"
});

MessageModel.belongsTo(UserModel, {
    foreignKey: "receiver_id",
    as: "Receiver"
});
export { UserModel, OrderModel, MessageModel };