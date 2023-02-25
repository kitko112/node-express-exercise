import { Router } from "express";
import { VehicleController } from "../controller/vehicleController";

const vehicleRouter = Router();

vehicleRouter.get("/vehicles/:id", new VehicleController({} as any).getVehicle);

export { vehicleRouter };
