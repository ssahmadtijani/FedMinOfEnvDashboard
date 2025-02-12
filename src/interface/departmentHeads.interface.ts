import { Model } from "sequelize"

export interface DepartmentHeadsAttr {
    departmentHeadId: string
    userId: string
    departmentId: string
    isActive: Date
    createdAt: Date
    updatedAt?: Date
    updatedByUserId?: string
}

export interface DepartmentHeadsModelI extends Model<DepartmentHeadsAttr>, DepartmentHeadsAttr {}