import { Vehicle } from "../model/vehicle";

export interface IVehicleRepository {
  getById(id: number): Promise<Vehicle | undefined>;
}
