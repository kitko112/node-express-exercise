import { Vehicle } from "../model/vehicle";

export type GetVehicleQueryParams = {
  stateUpdatedAt?: Date;
};

export interface IVehicleService {
  getVehicle(
    id: number,
    params: GetVehicleQueryParams
  ): Promise<Vehicle | undefined>;
}
