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
    try {
      const { rows } = await this._dbConnectionPool.query(query);
      const [row] = rows ?? [];

      if (row) {
        const { id, make, model, state } = row;
        const vehicle = new Vehicle(id, make, model, state);
        return vehicle;
      }

      return undefined;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
