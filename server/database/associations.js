import UserModel from "../models/UserModel.js";
import OrderModel from "../models/OrderModel.js";

UserModel.hasOne(OrderModel, {
    foreignKey: "user_id"
});

OrderModel.belongsTo(UserModel, {
    foreignKey: "user_id"
});

export { UserModel, OrderModel };