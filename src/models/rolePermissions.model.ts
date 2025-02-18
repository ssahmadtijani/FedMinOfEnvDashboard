import { sequelize, DataTypes } from '../config/database'
import { RolePermissionModelI } from '../interface/permissions.interface'

export const RolePermission = sequelize.define<RolePermissionModelI>(
    'RolePermission',
    {
        rolePermissionId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        roleId: {
            type: DataTypes.UUID,
            references: {
                model: 'Roles',
                key: 'roleId',
            },
        },

        permissionId: {
            type: DataTypes.UUID,
            references: {
                model: 'Permissions',
                key: 'permissionId',
            },
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        paranoid: true,
        freezeTableName: true,
    },
)
