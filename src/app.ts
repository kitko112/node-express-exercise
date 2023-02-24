import express from "express";
import { setupSwaggerUi } from "./swagger";

const app = express();
if (process.env.NODE_ENV === "dev") setupSwaggerUi(app);

app.listen(8080, () => {
  console.log("listening on port 8080");
});
