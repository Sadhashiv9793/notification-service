import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Notification Service API",
      version: "1.0.0",
      description:
        "Notification Service for Email, Webhooks and Event Processing",
    },

    servers: [
      {
        url: "http://localhost:5002/api/v1",
        description: "Local Development",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    "./src/routes/*.ts",
    "./src/controllers/*.ts",
  ],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (
  app: Express
): void => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );
};