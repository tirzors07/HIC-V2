import db from "../database/db.js";
import UserModel from "./UserModel.js"
import { DataTypes, Sequelize } from "sequelize";

const OrderModel = db.define('order', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    state: {
        type: DataTypes.ENUM('En Proceso', 'Preparando', 'Lista', 'Entregada'),
        defaultValue: 'En Proceso',
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    delivery_schedule: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
    timestamps: true,
});

export default OrderModel;