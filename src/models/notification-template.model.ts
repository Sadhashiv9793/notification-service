import {
  DataTypes,
  Model,
  Optional,
} from "sequelize";

import sequelize from "../config/database";

export interface NotificationTemplateAttributes {
  id: string;

  tenantId?: string | null;

  templateName: string;

  subject: string;

  body: string;

  createdAt?: Date;

  updatedAt?: Date;
}

export interface NotificationTemplateCreationAttributes
  extends Optional<
    NotificationTemplateAttributes,
    | "id"
    | "tenantId"
    | "createdAt"
    | "updatedAt"
  > {}

class NotificationTemplate
  extends Model<
    NotificationTemplateAttributes,
    NotificationTemplateCreationAttributes
  >
  implements NotificationTemplateAttributes
{
  public id!: string;

  public tenantId!: string | null;

  public templateName!: string;

  public subject!: string;

  public body!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

NotificationTemplate.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    tenantId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: "tenant_id",
    },

    templateName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "template_name",
    },

    subject: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "NotificationTemplate",
    tableName: "notification_templates",
    timestamps: true,
    underscored: true,
  }
);

export default NotificationTemplate;