import { sequelize, DataTypes } from '../config/database'
import { RolesModelI } from '../interface/roles.interface'

export const Roles = sequelize.define<RolesModelI>(
    'Roles',
    {
        roleId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        roleName: {
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
    },
)
