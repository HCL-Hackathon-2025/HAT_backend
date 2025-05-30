import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../config/db.js";

const Staff = sequelize.define("Staff", {
    id: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
    fullname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
});

export default Staff;
