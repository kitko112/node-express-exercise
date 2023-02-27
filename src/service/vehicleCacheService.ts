import { GetVehicleQueryParams } from "../model/types";
import { Vehicle } from "../model/vehicle";
import { IInMemCacheRepository } from "../repository/IInMemCache";
import { IVehicleService } from "./IVehicleService";

export class VehicleCacheService implements IVehicleService {
  private _vehicleService: IVehicleService;
  private _inMemCacheRepository: IInMemCacheRepository;

  constructor(
    vehicleService: IVehicleService,
    inMemCacheRepository: IInMemCacheRepository
  ) {
    this._inMemCacheRepository = inMemCacheRepository;
    this._vehicleService = vehicleService;
  }

  async getVehicle(
    id: number,
    { stateUpdatedAt }: GetVehicleQueryParams
  ): Promise<Vehicle | undefined> {
    let cacheKey = `getVehicle_${id}`;
    if (stateUpdatedAt) {
      cacheKey += "_" + stateUpdatedAt.toISOString().split(".")[0] + "Z";
    }

    const cachedVehicle = await this._inMemCacheRepository.get<Vehicle>(
      cacheKey
    );

    if (cachedVehicle) {
      // console.log("cacheKey found:", cacheKey, "value:", cachedVehicle);
      return cachedVehicle;
    } else {
      const vehicle = await this._vehicleService.getVehicle(id, {
        stateUpdatedAt,
      });

      if (vehicle) {
        // console.log("value cached:", cacheKey, cachedVehicle);
        this._inMemCacheRepository.set(cacheKey, vehicle, 60);
      }
      return vehicle;
    }
  }
}
