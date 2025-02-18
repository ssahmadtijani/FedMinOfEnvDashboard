import { Model } from 'sequelize'

export interface UsersAttr {
    userId?: string
    userName: string
    email: string
    phoneNumber?: string
    departmentId: string
    password: string
    createdAt?: Date
    updatedAt?: Date
}

export interface UsersModelI extends Model<UsersAttr>, UsersAttr {}
