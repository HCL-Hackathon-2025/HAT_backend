import { DataTypes, Sequelize, UUIDV4 } from "sequelize";
// department: _id: string name: string head: string

export const defineDepartmentModel = (sequelize) => {
    const Department = sequelize.define("Department", {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        head: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'Staff',
                key: 'id'
            }
        }
    }, {
        timestamps: true,
        tableName: 'Departments'
    });

    return Department;
} 