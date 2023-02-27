import request from "supertest";
import { Vehicle } from "../model/vehicle";
/*
 * @group integration
 */
describe("Vehicle Api Endpoint Test Suite", () => {
  describe("GET /vehicles/:id", () => {
    const vehicleRequest = request("http://localhost:8080");

    it("should return status 200 and vehicle 1 with quoted state without stateUpdatedAt", async () => {
      const res = await vehicleRequest.get("/vehicles/1");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(new Vehicle(1, "BMW", "X1", "quoted"));
    });

    it("should return status 200 and vehicle 1 with quoted state at 2022-09-11T11:23:54Z", async () => {
      const res = await vehicleRequest
        .get("/vehicles/1")
        .query({ stateUpdatedAt: "2022-09-11T11:23:54Z" });
      expect(res.status).toBe(200);
      expect(res.body).toEqual(new Vehicle(1, "BMW", "X1", "quoted"));
    });

    it("should return status 200 and vehicle 2 with quoted state at 2022-09-11T11:23:54Z", async () => {
      const res = await vehicleRequest
        .get("/vehicles/2")
        .query({ stateUpdatedAt: "2022-09-11T11:23:54Z" });
      expect(res.status).toBe(200);
      expect(res.body).toEqual(new Vehicle(2, "AUDI", "A4", "quoted"));
    });

    it("should return status 200 and vehicle 2 with selling state at 2022-09-11T17:23:54Z", async () => {
      const res = await vehicleRequest
        .get("/vehicles/2")
        .query({ stateUpdatedAt: "2022-09-11T18:23:54Z" });
      expect(res.status).toBe(200);
      expect(res.body).toEqual(new Vehicle(2, "AUDI", "A4", "selling"));
    });

    it("should return status 200 and vehicle 3 with selling state at 2022-09-11T22:23:54Z", async () => {
      const res = await vehicleRequest
        .get("/vehicles/3")
        .query({ stateUpdatedAt: "2022-09-11T22:23:54Z" });
      expect(res.status).toBe(200);
      expect(res.body).toEqual(new Vehicle(3, "VW", "GOLF", "quoted"));
    });

    it("should return status 200 and vehicle 3 with selling state at 2022-09-11T23:24:54Z", async () => {
      const res = await vehicleRequest
        .get("/vehicles/3")
        .query({ stateUpdatedAt: "2022-09-11T23:24:54Z" });
      expect(res.status).toBe(200);
      expect(res.body).toEqual(new Vehicle(3, "VW", "GOLF", "selling"));
    });

    it("should return status 200 and vehicle 3 with selling state at 2022-09-11T23:24:54Z", async () => {
      const res = await vehicleRequest
        .get("/vehicles/3")
        .query({ stateUpdatedAt: "2022-09-12T13:24:54Z" });
      expect(res.status).toBe(200);
      expect(res.body).toEqual(new Vehicle(3, "VW", "GOLF", "sold"));
    });

    it("should return status 404 when nonexistent vehicle 4 is requested", async () => {
      const res = await vehicleRequest.get("/vehicles/4");

      expect(res.status).toBe(404);
    });

    it("should return status 400 when non integer vehicle id 4 is given", async () => {
      const res = await vehicleRequest.get("/vehicles/abc");

      expect(res.status).toBe(400);
    });

    it("should return status 400 when non date is given", async () => {
      const res = await vehicleRequest
        .get("/vehicles/3")
        .query({ stateUpdatedAt: "abcd" });

      expect(res.status).toBe(400);
    });
  });
});
