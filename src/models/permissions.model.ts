import { sequelize, DataTypes } from '../config/database'
import { PermissionsModelI } from '../interface/permissions.interface'

export const Permissions = sequelize.define<PermissionsModelI>(
    'Permissions',
    {
        permissionId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        permission: {
            type: DataTypes.STRING,
        },
        
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        paranoid: true,
        freezeTableName: true,
    }
)
