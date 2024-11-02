import UserModel from "../models/UserModel.js";
//com para obtener todos los datos de los users de forma json
export const getAllUsers = async (req, res)=>{
    try {
        const Users = await UserModel.findAll()
        res.json(Users)
    } catch (error) {
        res.json({message: error.message})
    }
}