import { sequelize, DataTypes } from '../config/database'
import { UserRolesModelI } from '../interface/roles.interface'

export const UserRoles = sequelize.define<UserRolesModelI>(
    'UserRoles',
    {
        userRoleId: {
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

        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'userId',
            },
        },

        createdAt: {
            type: DataTypes.DATE,
        },
    },
    {
        paranoid: true,
        freezeTableName: true,
    },
)
