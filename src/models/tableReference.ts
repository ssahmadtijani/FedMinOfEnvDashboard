import { DepartmentHeads } from "./departmentHeads.model"
import { Departments } from "./departments.model"
import { Permissions } from "./permissions.model"
import { Projects } from "./projects.model"
import { RolePermission } from "./rolePermissions.model"
import { UserPermissions } from "./userPermissions.model"
import { UserRoles } from "./userRoles.model"
import { Roles } from "./roles.model"
import { Users } from "./user"

// Users and Departments
Users.belongsTo(Departments, {
    foreignKey: 'departmentId',
});
Departments.hasMany(Users, {
    foreignKey: 'departmentId',
});

// Department Heads and Users
DepartmentHeads.belongsTo(Users, {
    foreignKey: 'userId',
});
Users.hasMany(DepartmentHeads, {
    foreignKey: 'userId',
});

// Department Heads and Departments
DepartmentHeads.belongsTo(Departments, {
    foreignKey: 'departmentId',
});
Departments.hasMany(DepartmentHeads, {
    foreignKey: 'departmentId',
});

// Department Heads and UpdatedByUser (Self-Join on Users)
DepartmentHeads.belongsTo(Users, {
    foreignKey: 'updatedByUserId',
    as: 'updatedByUser',
});

// Projects and Departments
Projects.belongsTo(Departments, {
    foreignKey: 'departmentId',
});
Departments.hasMany(Projects, {
    foreignKey: 'departmentId',
});

// Projects and Users (CreatedBy)
Projects.belongsTo(Users, {
    foreignKey: 'createdByUserId',
    as: 'createdByUser',
});
Users.hasMany(Projects, {
    foreignKey: 'createdByUserId',
});

// Projects and Users (UpdatedBy)
Projects.belongsTo(Users, {
    foreignKey: 'updatedByUserId',
    as: 'updatedByUser',
});

// UserRoles and Users
UserRoles.belongsTo(Users, {
    foreignKey: 'userId',
});
Users.hasMany(UserRoles, {
    foreignKey: 'userId',
});

// UserRoles and Roles
UserRoles.belongsTo(Roles, {
    foreignKey: 'roleId',
});
Roles.hasMany(UserRoles, {
    foreignKey: 'roleId',
});

// UserPermissions and Users
UserPermissions.belongsTo(Users, {
    foreignKey: 'userId',
});
Users.hasMany(UserPermissions, {
    foreignKey: 'userId',
});

// UserPermissions and Permissions
UserPermissions.belongsTo(Permissions, {
    foreignKey: 'permissionId',
});
Permissions.hasMany(UserPermissions, {
    foreignKey: 'permissionId',
});

// RolePermissions and Roles
RolePermission.belongsTo(Roles, {
    foreignKey: 'roleId',
});
Roles.hasMany(RolePermission, {
    foreignKey: 'roleId',
});

// RolePermissions and Permissions
RolePermission.belongsTo(Permissions, {
    foreignKey: 'permissionId',
});
Permissions.hasMany(RolePermission, {
    foreignKey: 'permissionId',
});
