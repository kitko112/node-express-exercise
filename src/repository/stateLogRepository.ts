import { Pool } from "pg";
import { StateLog } from "../model/stateLog";
import { IStateLogRepository } from "./IStateLogRepository";

export class StateLogRepository implements IStateLogRepository {
  private _dbConnectionPool: Pool;

  constructor(dbConnectionPool: Pool) {
    this._dbConnectionPool = dbConnectionPool;
  }

  async getVehicleLastStateUpdatedAt(
    vehicleId: number,
    stateUpdatedAt: Date
  ): Promise<StateLog | undefined> {
    const query = {
      text: `
        SELECT
          *
        FROM
          "stateLogs"
        WHERE
          "vehicleId" = $1::integer
        AND
          "timestamp" <= $2::timestamptz
        ORDER BY
          "timestamp"
        DESC
        LIMIT 1
      `,
      values: [vehicleId, stateUpdatedAt],
    };
    try {
      const { rows } = await this._dbConnectionPool.query(query);
      const [row] = rows ?? [];

      if (row) {
        const { vehicleId, state, timestamp } = row;
        const stateLog = new StateLog(vehicleId, state, timestamp);
        return stateLog;
      }

      return undefined;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
