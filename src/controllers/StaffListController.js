
import { models } from "../models/index.js";
const { STAFF, DEPARTMENT } = models;

export const getStaffList = async(req,res)=>{
    const {role = "admin"} = req.user||{}

    if( role !== 'admin' && role !== 'hr') {
        return res.status(403).json({ message: "Forbidden: You do not have permission to access this resource." });
    }

    try {
        const users = await STAFF.findAll({
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

export const addStaffMember = async(req, res) => {
    const { role = "admin" } = req.user || {};


    if (role !== 'admin' ) {
        return res.status(403).json({ message: "Forbidden: You do not have permission to access this resource." });
    }

    try {
        const { email, password, fullname, role } = req.body;

        const existingUser = await STAFF.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        const department = req.body.department;

        const departmentData =  await DEPARTMENT.findOne({
            where: { name: department }
        });

        if (!departmentData) {
            return res.status(400).json({ message: "Invalid department." });
        }

        if (!department) {
            return res.status(400).json({ message: "Department is required." });
        }

        const newUser = await STAFF.create({
            email,
            password,
            fullname,
            role,
            department_id:departmentData.id,
        });

        return res.status(201).json(newUser);
    } catch (error) {
        console.error("Error adding staff member:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}