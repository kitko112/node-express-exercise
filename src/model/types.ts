import { Request } from "express";

export type State = "quoted" | "selling" | "sold";
export type GetVehicleQueryParams = {
  stateUpdatedAt?: Date;
};
export type GetVehicleRequest = Request<
  { id: number },
  {},
  {},
  GetVehicleQueryParams
>;
