import { Pool } from "pg";
import { createClient, RedisClientType } from "redis";
import { VehicleController } from "./controller/vehicleController";
import { RedisCacheRepository } from "./repository/redisCacheRepository";
import { StateLogRepository } from "./repository/stateLogRepository";
import { VehicleRepository } from "./repository/vehicleRepository";
import { VehicleCacheService } from "./service/vehicleCacheService";
import { VehicleService } from "./service/vehicleService";

const composeVehicleController = async () => {
  const dbConnectionPool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });

  const vehicleRepository = new VehicleRepository(dbConnectionPool);
  const stateLogRepository = new StateLogRepository(dbConnectionPool);

  const redisClient: RedisClientType = createClient();
  redisClient.on("error", (err) => console.log("Redis Client Error", err));
  await redisClient.connect();

  const inMemCacheRepository = new RedisCacheRepository(redisClient);
  const vehicleService = new VehicleService(
    vehicleRepository,
    stateLogRepository
  );

  const vehicleCacheService = new VehicleCacheService(
    vehicleService,
    inMemCacheRepository
  );

  process.on("exit", () => {
    // Add shutdown logic here.
    console.log("close all open connections");
    redisClient.quit();
  });

  return new VehicleController(vehicleCacheService);
};

export default () => ({
  vehicleController: composeVehicleController(),
});
