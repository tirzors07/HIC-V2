import db from "../database/db.js";
import { DataTypes } from "sequelize";

const MedicamentoModel = db.define('medicamento', {
    medicamento_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    flavor: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    dosis: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    frecuencia: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
});

// Relación muchos a muchos con `prescription` a través de la tabla `medicamento_prescripcion`
MedicamentoModel.belongsToMany(db.models.prescription, { through: 'medicamento_prescripcion', foreignKey: 'medicamento_id' });
export default MedicamentoModel;
