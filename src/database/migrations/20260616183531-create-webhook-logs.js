const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable("webhook_logs", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      request_body: {
        type: DataTypes.JSONB,
        allowNull: false,
      },

      response_body: {
        type: DataTypes.JSONB,
        allowNull: true,
      },

      status_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      retry_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("webhook_logs");
  },
};