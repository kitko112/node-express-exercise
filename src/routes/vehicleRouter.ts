import { Router } from "express";
import compose from "../compositionRoot";
import { GetVehicleRequest } from "../model/types";

const vehicleRouter = Router();
const { vehicleController } = compose();

vehicleRouter.get("/vehicles/:id", (req: GetVehicleRequest, res, next) =>
  vehicleController.getVehicle(req, res, next)
);

export { vehicleRouter };
