import { sequelize, DataTypes } from '../config/database'
import { UserPermissionsModelI } from '../interface/permissions.interface'

export const UserPermissions = sequelize.define<UserPermissionsModelI>(
    'UserPermissions',
    {
        userPermissionId: {
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
