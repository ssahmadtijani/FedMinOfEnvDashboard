import { sequelize, DataTypes } from '../config/database';
import { UsersModelI } from '../interface/users.interface';

export const Users = sequelize.define<UsersModelI>(
    'Users',
    {
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        userName: {
            type: DataTypes.STRING,
        },

        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            unique: true,
        },

        phoneNumber: {
            type: DataTypes.STRING,
        },

        departmentId: {
            type: DataTypes.UUID,
            references: {
                model: 'Departments',
                key: 'departmentId',
            },
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        
        updatedAt: {
            type: DataTypes.DATE,
        },
    },
    {
        paranoid: true,
        freezeTableName: true,
    }
)
