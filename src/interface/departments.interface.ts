import { Model } from "sequelize"

export interface DepartmentsAttr {
    departmentId?: string
    departmentName?: string
    departmentShortName?: string
    createdAt?: Date
}

export interface DepartmentsModelI extends Model<DepartmentsAttr>, DepartmentsAttr {}