import { IStateLogRepository } from "../repository/IStateLogRepository";
import { IVehicleRepository } from "../repository/IVehichleRepository";
import { Vehicle } from "../model/vehicle";
import { GetVehicleQueryParams, IVehicleService } from "./IVehicleService";

export class VehicleService implements IVehicleService {
  private _vehicleRepository: IVehicleRepository;
  private _stateLogRepository: IStateLogRepository;

  constructor(
    vehicleRepository: IVehicleRepository,
    stateLogRepository: IStateLogRepository
  ) {
    this._vehicleRepository = vehicleRepository;
    this._stateLogRepository = stateLogRepository;
  }

  async getVehicle(
    id: number,
    { stateUpdatedAt }: GetVehicleQueryParams
  ): Promise<Vehicle | undefined> {
    const vehicle = await this._vehicleRepository.getById(id);
    if (vehicle) {
      if (stateUpdatedAt) {
        const stateLog =
          await this._stateLogRepository.getVehicleLastStateUpdatedAt(
            id,
            stateUpdatedAt
          );
        vehicle.state = stateLog.state;
      }
      return vehicle;
    }
  }
}
