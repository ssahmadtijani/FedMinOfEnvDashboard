module.exports = {
    up: async (queryInterface, DataTypes) => {
        const transaction = await queryInterface.sequelize.transaction()
        try {
            await queryInterface.createTable(
                'Users',
                {
                    userId: {
                        type: DataTypes.UUID,
                        defaultValue: DataTypes.UUIDV4,
                        primaryKey: true,
                    },
                    userName: {
                        type: DataTypes.STRING,
                        allowNull: false,
                    },
                    email: {
                        type: DataTypes.STRING,
                        unique: true,
                        allowNull: false,
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
                        onUpdate: 'CASCADE',
                        onDelete: 'SET NULL',
                    },
                    createdAt: {
                        type: DataTypes.DATE,
                        allowNull: false,
                    },
                    updatedAt: {
                        type: DataTypes.DATE,
                        allowNull: false,
                    },
                    deletedAt: {
                        type: DataTypes.DATE,
                        defaultValue: null,
                    },
                },
                { transaction, paranoid: true, freezeTableName: true }
            )

            await transaction.commit()
        } catch (err) {
            await transaction.rollback()
            throw err
        }
    },
    down: async (queryInterface) => {
        const transaction = await queryInterface.sequelize.transaction()
        try {
            await queryInterface.dropTable('Users', { transaction })
            await transaction.commit()
        } catch (err) {
            await transaction.rollback()
            throw err
        }
    },
}