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
  public id!: string;

  public tenantId!: string;

  public userId!: string | null;

  public type!: string;

  public channel!: string;

  public status!: string;

  public subject!: string;

  public content!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
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