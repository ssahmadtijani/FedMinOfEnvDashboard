module.exports = {
  up: async (queryInterface, DataTypes) => {
      const transaction = await queryInterface.sequelize.transaction()
      try {
          await queryInterface.createTable(
              'UserPasswords',
              {
                  userPasswordId: {
                      type: DataTypes.UUID,
                      defaultValue: DataTypes.UUIDV4,
                      primaryKey: true,
                  },
                  userId: {
                      type: DataTypes.UUID,
                      references: {
                        model: 'Users',
                        key: 'userId'
                      }
                  },
                  password: {
                      type: DataTypes.STRING,
                      allowNull: false,
                  },
                  createdAt: {
                      type: DataTypes.DATE,
                  },
                  updatedAt: {
                      type: DataTypes.DATE,
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
          await queryInterface.dropTable('UserPasswords', { transaction })
          await transaction.commit()
      } catch (err) {
          await transaction.rollback()
          throw err
      }
  },
}