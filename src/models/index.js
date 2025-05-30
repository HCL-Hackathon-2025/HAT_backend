import { sequlize } from "../db/connection.js";
import { defineDepartmentModel } from "./Departments.js";
import { defineRoleModel } from "./Roles.js";
import { defineStaffModel } from "./Staff.js";

export const models = {
    STAFF: defineStaffModel(sequlize),
    DEPARTMENT: defineDepartmentModel(sequlize),
    ROLE : defineRoleModel(sequlize)
}