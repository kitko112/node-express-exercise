import { Router } from "express";
import compose from "../compositionRoot";
import { GetVehicleRequest } from "../model/types";

const vehicleRouter = Router();
const { vehicleController } = compose();

vehicleRouter.get("/vehicles/:id", async (req: GetVehicleRequest, res, next) =>
  (await vehicleController).getVehicle(req, res, next)
);

export { vehicleRouter };
