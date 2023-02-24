import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { parse } from "yaml";

const file = readFileSync("./open-api.yml", "utf8");
const swaggerDocument = parse(file);

export const setupSwaggerUi = (app: Express) =>
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
