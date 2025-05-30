import { models } from "../models/index.js";

const { DEPARTMENT, ROLE } = models;

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

        res.status(200).json({ message: "Seed data created successfully." });
    } catch (error) {
        console.error("Error seeding data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}