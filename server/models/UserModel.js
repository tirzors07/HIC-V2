import db from "../db.js";//conectar con la bd
import { DataTypes } from "sequelize";//tipe of datas for atributes in db

const UserModel = db.define('user',{
    /*user_id: {
        type: DataTypes.INT,
        primaryKey: true,
        autoIncrement: true,
    },*/
    name_: {
        type: DataTypes.STRING(50),
        allowNull:false,
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique:true,
    }, 
    password_: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    matricula: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    role: {
        type: DataTypes.ENUM('general','hic_admin'),
        allowNull: true,
        defaultValue:'general',
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull:false,
    },
}, {
    timestamps:false,
});
export default UserModel;