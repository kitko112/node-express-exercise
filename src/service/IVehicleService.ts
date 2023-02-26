import { GetVehicleQueryParams } from "../model/types";
import { Vehicle } from "../model/vehicle";

export interface IVehicleService {
  getVehicle(
    id: number,
    params: GetVehicleQueryParams
  ): Promise<Vehicle | undefined>;
}
