import { sequlize } from "../db/connection.js";
import { defineDepartmentModel } from "./Departments.js";
import { defineRoleModel } from "./Roles.js";
import { defineUserModel } from "./User.js";

export const models = {
    USER: defineUserModel(sequlize),
    DEPARTMENT: defineDepartmentModel(sequlize),
    ROLE : defineRoleModel(sequlize)
}