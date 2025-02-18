import { Model } from 'sequelize'

export interface RolesAttr {
    roleId?: string
    roleName?: string
    createdAt?: Date
}

export interface RolesModelI extends Model<RolesAttr>, RolesAttr {}

export interface UserRolesAttr {
    userRoleId?: string
    roleId?: string
    userId?: string
    createdAt?: Date
}

export interface UserRolesModelI extends Model<UserRolesAttr>, UserRolesAttr {}
