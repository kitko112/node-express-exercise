import { IVehicleService } from "../service/IVehicleService";
import { Response, NextFunction } from "express";
import { Vehicle } from "../model/vehicle";
import { HttpException } from "../httpException";
import { GetVehicleRequest } from "../model/types";

export class VehicleController {
  private _vehicleService: IVehicleService;

  constructor(vehicleService: IVehicleService) {
    this._vehicleService = vehicleService;
  }

  async getVehicle(
    { params, query }: GetVehicleRequest,
    res: Response<Vehicle>,
    next: NextFunction
  ) {
    const { id } = params;
    const { stateUpdatedAt } = query;

    try {
      const vehicle = await this._vehicleService.getVehicle(id, {
        stateUpdatedAt: stateUpdatedAt ? new Date(stateUpdatedAt) : undefined,
      });

      if (vehicle) {
        res.json(vehicle);
      } else {
        next(new HttpException(404, "Not Found"));
      }
    } catch (e) {
      next(new HttpException(500, "Internal Server Error"));
    }
  }
}
