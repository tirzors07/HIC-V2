import db from "../database/db.js";
import { DataTypes } from "sequelize";

const PrescriptionModel = db.define('prescription', {
    prescription_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    flavor: {
        type: DataTypes.ENUM("Sin preferencia", "Fresa", "Mango", "Chocolate", "Vainilla"),
        defaultValue: "Sin preferencia",
    },
    image_format: {
        type: DataTypes.ENUM('JPEG', 'PNG', 'JPG'),
        allowNull: false,
    },
    image_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    upload_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});


export default PrescriptionModel;