import {
  DataTypes,
  Model,
  Optional,
} from "sequelize";

import sequelize from "../config/database";

export interface NotificationAttributes {
  id: string;

  tenantId: string;

  userId?: string | null;

  type: string;

  channel: string;

  status: string;

  subject: string;

  content: string;

  createdAt?: Date;

  updatedAt?: Date;
}

export interface NotificationCreationAttributes
  extends Optional<
    NotificationAttributes,
    | "id"
    | "userId"
    | "createdAt"
    | "updatedAt"
  > {}

class Notification
  extends Model<
    NotificationAttributes,
    NotificationCreationAttributes
  >
  implements NotificationAttributes
{
  declare id: string;

  declare tenantId: string;

  declare  userId: string | null;

  declare type: string;

  declare  channel: string;

  declare status: string;

  declare subject: string;

  declare content: string;

  declare readonly createdAt: Date;

  declare readonly updatedAt: Date;
}

Notification.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    tenantId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "tenant_id",
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: "user_id",
    },

    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    channel: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "pending",
    },

    subject: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Notification",
    tableName: "notifications",
    timestamps: true,
    underscored: true,
  }
);

export default Notification;