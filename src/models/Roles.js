import { UUIDV4, DataTypes } from "sequelize";

export const defineRoleModel = (sequelize) => {
    const Role = sequelize.define("Role", {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        }
    }, {
        timestamps: true,
        tableName: 'Roles'
    });

    return Role;
}