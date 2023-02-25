import { StateLog } from "../model/stateLog";

export interface IStateLogRepository {
  getVehicleLastStateUpdatedAt(
    vehicleId: number,
    stateUpdatedAt: Date
  ): StateLog;
}
