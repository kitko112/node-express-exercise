import {
  GetVehicleQueryParams,
  IVehicleService,
} from "../service/IVehicleService";
import { Request, Response, NextFunction } from "express";
import { Vehicle } from "../model/vehicle";
import { HttpException } from "../httpException";

export class VehicleController {
  private _vehicleService: IVehicleService;

  constructor(vehicleService: IVehicleService) {
    this._vehicleService = vehicleService;
  }

  // TODO: set api test to verify the response
  async getVehicle(
    req: Request<{ id: number }, {}, {}, GetVehicleQueryParams>,
    res: Response<Vehicle>,
    next: NextFunction
  ) {
    const id = req.params.id;
    const stateUpdatedAt = req.query.stateUpdatedAt;

    try {
      const vehicle = await this._vehicleService.getVehicle(id, {
        stateUpdatedAt,
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
