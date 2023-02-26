import { Pool } from "pg";
import { Vehicle } from "../model/vehicle";
import { IVehicleRepository } from "./IVehicleRepository";

export class VehicleRepository implements IVehicleRepository {
  private _dbConnectionPool: Pool;

  constructor(_dbConnectionPool: Pool) {
    this._dbConnectionPool = _dbConnectionPool;
  }

  async getById(id: number): Promise<Vehicle | undefined> {
    const query = {
      text: `
        SELECT 
          * 
        FROM 
          "vehicles"
        WHERE 
          "id" = $1::integer
        `,
      values: [id],
    };
    const client = await this._dbConnectionPool.connect();
    try {
      const queryResult = await client.query(query);
      const [row] = queryResult?.rows ?? [];

      if (row) {
        const { id, make, model, state } = row;
        const vehicle = new Vehicle(id, make, model, state);
        return vehicle;
      }

      return undefined;
    } catch (e) {
      throw e;
    } finally {
      await client.release();
    }
  }
}
