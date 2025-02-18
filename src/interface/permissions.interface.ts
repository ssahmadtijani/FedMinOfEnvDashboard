import { Model } from 'sequelize'

export interface PermissionsAttr {
    permissionId?: string
    permission?: string
    createdAt?: Date
}

export interface PermissionsModelI extends Model<PermissionsAttr>, PermissionsAttr {}

export interface UserPermissionsAttr {
    userPermissionId?: string
    userId?: string
    permissionId?: string
    createdAt?: Date
}

export interface UserPermissionsModelI extends Model<UserPermissionsAttr>, UserPermissionsAttr {}

export interface RolePermissionAttr {
    rolePermissionId?: string
    roleId?: string
    permissionId?: string
    createdAt?: Date
}

export interface RolePermissionModelI extends Model<RolePermissionAttr>, RolePermissionAttr {}
