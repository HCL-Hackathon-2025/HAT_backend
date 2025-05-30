
import { models } from "../models/index.js";
const { USER } = models;

export const getStaffList = async(req,res)=>{
    const {role = "admin"} = req.user||{}

    if( role !== 'admin' && role !== 'hr') {
        return res.status(403).json({ message: "Forbidden: You do not have permission to access this resource." });
    }

    try {
        const users = await USER.findAll({
        attributes: {
            exclude: ['password', 'createdAt', 'updatedAt']
            }
        });

        if(!users || users.length === 0) {
            return res.status(404).json({ message: "No users found." });
        }
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({message: "internal server error"})
    }
}