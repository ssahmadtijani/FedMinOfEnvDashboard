import { sequelize, DataTypes } from '../config/database';
import { DepartmentsModelI } from '../interface/departments.interface';

export const Departments = sequelize.define<DepartmentsModelI>(
    'Departments',
    {
        departmentId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        departmentName: {
            type: DataTypes.STRING,
        },

        departmentShortName: {
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
