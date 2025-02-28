import { Model } from 'sequelize'

export interface UsersAttr {
    userId?: string
    userName: string
    email: string
    phoneNumber?: string
    departmentId: string
    createdAt?: Date
    updatedAt?: Date
}

export interface UserPasswordsAttr {
    userPasswordId?: string
    userId: string
    password: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface UsersModelI extends Model<UsersAttr>, UsersAttr {}
export interface UserPasswordsModelI extends Model<UserPasswordsAttr>, UserPasswordsAttr {}
