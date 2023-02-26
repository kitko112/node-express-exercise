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
          "timestamp" <= $2::date
        ORDER BY
          "timestamp"
        DESC
        LIMIT 1
      `,
      values: [vehicleId, stateUpdatedAt],
    };
    const client = await this._dbConnectionPool.connect();
    try {
      const queryResult = await client.query(query);
      const [row] = queryResult?.rows ?? [];

      if (row) {
        const { vehicleId, state, timestamp } = row;
        const stateLog = new StateLog(vehicleId, state, timestamp);
        return stateLog;
      }

      return undefined;
    } catch (e) {
      throw e;
    } finally {
      await client.release();
    }
  }
}
