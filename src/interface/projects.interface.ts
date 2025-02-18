import { Model } from 'sequelize'

export interface ProjectsAttr {
    projectId: string
    projectName: string
    projectCode: string
    description?: string
    startDate?: Date
    status: string
    proposedEndDate?: Date
    actualEndDate?: Date
    longitude?: string
    latitude?: string
    departmentId: string
    createdByUserId: string
    createdAt: Date
    updatedAt?: Date
    updatedByUserId?: string
}

export interface ProjectsModelI extends Model<ProjectsAttr>, ProjectsAttr {}
