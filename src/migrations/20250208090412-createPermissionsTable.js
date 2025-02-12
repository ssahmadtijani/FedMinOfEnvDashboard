module.exports = {
  up: async (queryInterface, DataTypes) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "Roles",
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
        { transaction }
      );
      await queryInterface.createTable(
        "Permissions",
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
        { transaction }
      );
      await queryInterface.createTable(
        "UserRoles",
        {
          userRoleId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },
          roleId: {
            type: DataTypes.UUID,
            references: {
              model: "Roles",
              key: "roleId",
            },
          },
          userId: {
            type: DataTypes.UUID,
            references: {
              model: "Users",
              key: "userId",
            },
          },
          createdAt: {
            type: DataTypes.DATE,
          },
        },
        { transaction }
      );

      await queryInterface.createTable(
        "UserPermissions",
        {
          userPermissionId: {
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
          },
          permissionId: {
            type: DataTypes.UUID,
            references: {
              model: "Permissions",
              key: "permissionId",
            },
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
        },
        { transaction }
      );

      await queryInterface.createTable(
        "RolePermission",
        {
          rolePermissionId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },
          roleId: {
            type: DataTypes.UUID,
            references: {
              model: "Roles",
              key: "roleId",
            },
          },
          permissionId: {
            type: DataTypes.UUID,
            references: {
              model: "Permissions",
              key: "permissionId",
            },
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
        },
        { transaction }
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
      await queryInterface.dropTable("UserRoles", { transaction });
      await queryInterface.dropTable("UserPermissions", { transaction });
      await queryInterface.dropTable("Roles", { transaction });
      await queryInterface.dropTable("RolePermission", { transaction });
      await queryInterface.dropTable("Permissions", { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
