import { models } from "../models/index.js";
import bcrypt from "bcrypt";

const { DEPARTMENT, ROLE, STAFF } = models;

const ROLES_SEED = [
    { name: 'admin', permissions: ["all"] },
    { name: 'doctor', permissions: ["read","write"] },
    { name: 'nurse', permissions: ["read"] },
    { name: 'technician', permissions: ["read"] },
]

const DEPARTMENTS_SEED = [
    {name: 'CArdiology' },
    {name: "Pediatrics"},
    {name: "Radiology"},
    {name: "General Surgery"},
    {name: "Emergency"},
]

const adminUser = {
    fullname: "Admin User",
    password: "admin123",
    email: "admin@xyz.com",
    isAdmin: true,

} 

export const createSeeders = async(req, res)=> {
    try {
        // Seed roles
        for (const roleData of ROLES_SEED) {
            const [role, created] = await ROLE.findOrCreate({
                where: { name: roleData.name },
                defaults: roleData
            });
            if (created) {
                console.log(`Role ${role.name} created.`);
            } else {
                console.log(`Role ${role.name} already exists.`);
            }
        }

        // Seed departments
        for (const departmentData of DEPARTMENTS_SEED) {
            const [department, created] = await DEPARTMENT.findOrCreate({
                where: { name: departmentData.name },
                defaults: departmentData
            });
            if (created) {
                console.log(`Department ${department.name} created.`);
            } else {
                console.log(`Department ${department.name} already exists.`);
            }
        }

        // Seed admin user
        const hashedPassword = await bcrypt.hash(adminUser.password, 10);
        const [admin, created] = await STAFF.findOrCreate({
            where: { email: adminUser.email },
            defaults: {
                ...adminUser,
                password: hashedPassword,
                isMedicalStaff: true,
                role_id: (await ROLE.findOne({ where: { name: 'admin' } })).id,
                department_id: (await DEPARTMENT.findOne({ where: { name: 'CArdiology' } })).id
            }
        });
        if (created) {
            console.log(`Admin user ${admin.fullname} created.`);
        } else {
            console.log(`Admin user ${admin.fullname} already exists.`);
        }


        res.status(200).json({ message: "Seed data created successfully." });
    } catch (error) {
        console.error("Error seeding data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}