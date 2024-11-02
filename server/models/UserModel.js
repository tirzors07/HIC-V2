import db from "../db.js";//conectar con la bd
import { DataTypes } from "sequelize";//tipe of datas for atributes in db

const UserModel = db.define('user',{
    user_id:{type: DataTypes.INTEGER},
    name_:{type: DataTypes.STRING},
    email:{type: DataTypes.STRING},
    password_:{type: DataTypes.STRING},
    matricula:{type: DataTypes.STRING},
    role:{type: DataTypes.ENUM},
    created_at:{type: DataTypes.TIME},
});