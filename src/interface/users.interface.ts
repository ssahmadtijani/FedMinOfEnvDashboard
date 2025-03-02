import { Model } from 'sequelize'

export interface UsersAttr {
    userId?: string
    userName: string
    email: string
    phoneNumber?: string
    departmentId: string
    isVerified: boolean
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

export interface UsersModelI extends Model<UsersAttr>, UsersAttr {
    UserRoles: any
}
export interface UserPasswordsModelI extends Model<UserPasswordsAttr>, UserPasswordsAttr {}
