import {
  DataTypes,
  Model,
  Optional,
} from "sequelize";

import sequelize from "../config/database";

export interface WebhookLogAttributes {
  id: string;

  url: string;

  requestBody: object;

  responseBody?: object | null;

  statusCode?: number | null;

  retryCount: number;

  createdAt?: Date;

  updatedAt?: Date;
}

export interface WebhookLogCreationAttributes
  extends Optional<
    WebhookLogAttributes,
    | "id"
    | "responseBody"
    | "statusCode"
    | "createdAt"
    | "updatedAt"
  > {}

class WebhookLog
  extends Model<
    WebhookLogAttributes,
    WebhookLogCreationAttributes
  >
  implements WebhookLogAttributes
{
  declare id: string;

  declare url: string;

  declare requestBody: object;

  declare responseBody: object | null;

  declare statusCode: number | null;

  declare retryCount: number;

  declare readonly createdAt: Date;

  declare readonly updatedAt: Date;
}

WebhookLog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    requestBody: {
      type: DataTypes.JSONB,
      allowNull: false,
      field: "request_body",
    },

    responseBody: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: "response_body",
    },

    statusCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "status_code",
    },

    retryCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "retry_count",
    },
  },
  {
    sequelize,
    modelName: "WebhookLog",
    tableName: "webhook_logs",
    timestamps: true,
    underscored: true,
  }
);

export default WebhookLog;