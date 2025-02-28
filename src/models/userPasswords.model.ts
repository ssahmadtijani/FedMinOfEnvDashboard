import { sequelize, DataTypes } from '../config/database'
import { UserPasswordsModelI } from "../interface/users.interface"
import { Users } from "./user"

export const UserPasswords = sequelize.define<UserPasswordsModelI>(
    'UserPasswords',
    {
        userPasswordId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        userId: {
            type: DataTypes.UUID,
            references: {
                model: Users,
                key: 'userId'
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },

        updatedAt: {
            type: DataTypes.DATE,
        },

        deletedAt: {
            type: DataTypes.DATE,
            defaultValue: null
        },
    },
    {
        paranoid: true,
        freezeTableName: true
    }
)