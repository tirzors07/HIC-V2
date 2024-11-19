import db from "../database/db.js";
import { DataTypes } from "sequelize";

const OrderModel = db.define('order', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    state: {
        type: DataTypes.ENUM('Confirmed', 'Processing', 'Shipped', 'Delivered'),
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    prescription_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    delivery_schedule: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

// Relaciones
OrderModel.belongsTo(db.models.user, { foreignKey: 'user_id' });
OrderModel.belongsTo(db.models.prescription, { foreignKey: 'prescription_id' });

export default OrderModel;
