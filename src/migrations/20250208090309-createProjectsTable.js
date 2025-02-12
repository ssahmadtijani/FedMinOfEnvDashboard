module.exports = {
  up: async (queryInterface, DataTypes) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "Projects",
        {
          projectId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },
          projectName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          projectCode: {
            type: DataTypes.STRING,
            unique: true,
          },
          description: {
            type: DataTypes.TEXT,
          },
          startDate: {
            type: DataTypes.DATE,
          },
          status: {
            type: DataTypes.STRING,
          },
          proposedEndDate: {
            type: DataTypes.DATE,
          },
          actualEndDate: {
            type: DataTypes.DATE,
          },
          longitude: {
            type: DataTypes.STRING,
          },
          latitude: {
            type: DataTypes.STRING,
          },
          departmentId: {
            type: DataTypes.UUID,
            references: {
              model: "Departments",
              key: "departmentId",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
          },
          createdByUserId: {
            type: DataTypes.UUID,
            references: {
              model: "Users",
              key: "userId",
            },
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
        },
        { transaction, paranoid: true, freezeTableName: true }
      )

      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err;
    }
  },
  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable("Projects", { transaction })
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err
    }
  },
}
