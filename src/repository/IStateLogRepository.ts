import { StateLog } from "../model/stateLog";

export interface IStateLogRepository {
  getVehicleLastStateLogAt(vehicleId: number, timestamp: Date): StateLog;
}
