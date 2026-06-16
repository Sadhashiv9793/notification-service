const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(
      "notification_templates",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },

        tenant_id: {
          type: DataTypes.UUID,
          allowNull: true,
        },

        template_name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },

        subject: {
          type: DataTypes.TEXT,
          allowNull: false,
        },

        body: {
          type: DataTypes.TEXT,
          allowNull: false,
        },

        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },

        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable(
      "notification_templates"
    );
  },
};