import { DataTypes, UUIDV4 } from "sequelize";

export const defineUserModel = (sequelize) => {
    const User = sequelize.define("User", {
        id:{
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        qualification: {
            type: DataTypes.STRING,
            allowNull: true
        },
        workStartDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isMedicalStaff: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        department_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'Departments',
                key: 'id'
            }
        },
        role_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'Roles',
                key: 'id'
            }
        },
        weekoffDays: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        reportsTo: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        employeeId: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
    })

    return User;
}