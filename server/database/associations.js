import UserModel from "../models/UserModel.js";
import OrderModel from "../models/OrderModel.js";

// Define las asociaciones
OrderModel.belongsTo(UserModel, { foreignKey: 'user_id' });
UserModel.hasMany(OrderModel, { foreignKey: 'user_id' });
