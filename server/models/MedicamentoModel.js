import db from "../database/db.js";
import { DataTypes } from "sequelize";

const MedicamentoModel = db.define('medicamento', {
    medicamento_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    prescription_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    flavor: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    dosis: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    frecuencia: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
});

export default MedicamentoModel;
