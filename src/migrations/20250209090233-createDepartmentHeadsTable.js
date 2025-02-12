module.exports = {
  up: async (queryInterface, DataTypes) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "DepartmentHeads",
        {
          departmentHeadId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },
          userId: {
            type: DataTypes.UUID,
            references: {
              model: "Users",
              key: "userId",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
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
          isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
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
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable("DepartmentHeads", { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};

