import { sequelize, DataTypes } from '../config/database';
import { ProjectsModelI } from '../interface/projects.interface'

export const Projects = sequelize.define<ProjectsModelI>(
    'Projects',
    {
        projectId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        projectName: {
            type: DataTypes.STRING,
        },

        projectCode: {
            type: DataTypes.STRING,
        },

        description: {
            type: DataTypes.TEXT,
        },

        startDate: {
            type: DataTypes.DATE,
        },

        status: {
            type: DataTypes.ENUM('PENDING', 'IN-PROGRESS', 'COMPLETE'),
        },

        proposedEndDate: {
            type: DataTypes.DATE,
        },

        actualEndDate: {
            type: DataTypes.DATE,
        },

        longitude: {
            type: DataTypes.STRING,
        },

        latitude: {
            type: DataTypes.STRING,
        },

        departmentId: {
            type: DataTypes.UUID,
            references: {
                model: 'Departments',
                key: 'departmentId',
            },
        },

        createdByUserId: {
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'userId',
            },
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        
        updatedByUserId: {
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'userId',
            },
        },
    },
    {
        paranoid: true,
        freezeTableName: true,
    }
)
