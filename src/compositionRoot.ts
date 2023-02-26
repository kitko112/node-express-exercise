import { Pool } from "pg";
import { VehicleController } from "./controller/vehicleController";
import { StateLogRepository } from "./repository/stateLogRepository";
import { VehicleRepository } from "./repository/vehicleRepository";
import { VehicleService } from "./service/vehicleService";

const composeVehicleController = () => {
  const dbConnectionPool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });

  const vehicleRepository = new VehicleRepository(dbConnectionPool);
  const stateLogRepository = new StateLogRepository(dbConnectionPool);

  const vehicleService = new VehicleService(
    vehicleRepository,
    stateLogRepository
  );

  return new VehicleController(vehicleService);
};

export default () => ({
  vehicleController: composeVehicleController(),
});
