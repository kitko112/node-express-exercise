import express from "express";
import { setupSwaggerUi } from "./swagger";
import * as OpenApiValidator from "express-openapi-validator";
import { vehicleRouter } from "./routes/vehicleRouter";

const app = express();
if (process.env.NODE_ENV === "dev") {
  setupSwaggerUi(app);
}

app.use(
  OpenApiValidator.middleware({
    apiSpec: "./openapi.yml",
    validateRequests: true, // (default)
    validateResponses: false, // false by default
  })
);

app.use(vehicleRouter);

app.use("/", (err, req, res, next) => {
  // format error
  const { message, errors } = err;
  res.status(err.status || 500).json({ message, errors });
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
