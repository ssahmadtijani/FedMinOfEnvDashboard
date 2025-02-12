import { Model } from "sequelize"

export interface UsersAttr {
    userId: string
    userName?: string
    firstName: string
    lastName: string
    email: string
    phoneNumber?: string
    departmentId: string
    createdAt: Date
    updatedAt?: Date
}

export interface UsersModelI extends Model<UsersAttr>, UsersAttr {
}
