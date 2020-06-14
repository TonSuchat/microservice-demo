module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "userSessions",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      userId: {
        allowNull: false,
        reference: {
          key: "id",
          model: "users",
        },
        type: DataTypes.UUID,
      },
      expiredAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      charset: "utf8",
    },
  );
};

// model.exports.down = (queryInterface) => queryInterface.dropTable("userSessions");
