import { Sequelize } from "sequelize";
import { env } from "./env";

export const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USER,
  env.DB_PASSWORD,
  {
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: "postgres",

    logging:
      env.NODE_ENV === "development"
        ? (sql) => console.log(sql)
        : false,

    define: {
      underscored: true,
      timestamps: true,
      freezeTableName: true,
    },

    pool: {
      max: 20,
      min: 5,
      acquire: 30000,
      idle: 10000,
    },

    dialectOptions: {
      connectTimeout: 30000,
    },
  }
);

export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();

    console.log("✅ PostgreSQL Connected");
  } catch (error) {
    console.error(
      "❌ PostgreSQL Connection Failed",
      error
    );

    process.exit(1);
  }
};

export default sequelize;