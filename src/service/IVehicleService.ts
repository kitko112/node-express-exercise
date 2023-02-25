import { Vehicle } from "../model/vehicle";

export type GetVehicleParams = {
  stateUpdatedAt?: Date;
};

export interface IVehicleService {
  getVehicle(
    id: number,
    params: GetVehicleParams
  ): Promise<Vehicle | undefined>;
}
