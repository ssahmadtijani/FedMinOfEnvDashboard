import { sequelize, DataTypes } from '../config/database'
import { DepartmentHeadsModelI } from '../interface/departmentHeads.interface'

export const DepartmentHeads = sequelize.define<DepartmentHeadsModelI>(
    'DepartmentHeads',
    {
        departmentHeadId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'userId',
            },
        },

        departmentId: {
            type: DataTypes.UUID,
            references: {
                model: 'Departments',
                key: 'departmentId',
            },
        },

        isActive: {
            type: DataTypes.BOOLEAN,
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        updatedAt: {
            type: DataTypes.DATE,
        },

        updatedByUserId: {
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'userId',
            },
            defaultValue: null,
        },
    },
    {
        paranoid: true,
        freezeTableName: true,
    },
)
