import { StateLog } from "../model/stateLog";
import { Vehicle } from "../model/vehicle";
import { IStateLogRepository } from "../repository/IStateLogRepository";
import { IVehicleRepository } from "../repository/IVehicleRepository";
import { VehicleService } from "./vehicleService";

describe("Vehicle Service Test Suite", () => {
  describe("getVehicle", () => {
    const mockDatetime = new Date("2023-02-25T00:55:05.183Z");
    const mockVehicle = new Vehicle(1, "BMW", "X1", "selling");
    const mockStateLog = new StateLog(1, "quoted", mockDatetime);

    it("should return vehicle detail with state updated at particular time", async () => {
      const mockVehicleRepository: IVehicleRepository = {
        getById: jest.fn().mockResolvedValue(mockVehicle),
      };
      const mockStateLogRepository: IStateLogRepository = {
        getVehicleLastStateUpdatedAt: jest.fn().mockResolvedValue(mockStateLog),
      };
      const vehicleService = new VehicleService(
        mockVehicleRepository,
        mockStateLogRepository
      );
      const vehicle = await vehicleService.getVehicle(1, {
        stateUpdatedAt: mockDatetime,
      });
      expect(mockStateLogRepository.getVehicleLastStateUpdatedAt).toBeCalled();
      expect(vehicle).toEqual({ ...mockVehicle, state: mockStateLog.state });
    });

    it("should return vehicle detail with original state when stateUpdatedAt is not given", async () => {
      const mockVehicleRepository: IVehicleRepository = {
        getById: jest.fn().mockResolvedValue(mockVehicle),
      };
      const mockStateLogRepository: IStateLogRepository = {
        getVehicleLastStateUpdatedAt: jest.fn(),
      };

      const vehicleService = new VehicleService(
        mockVehicleRepository,
        mockStateLogRepository
      );
      const vehicle = await vehicleService.getVehicle(1, {});
      expect(
        mockStateLogRepository.getVehicleLastStateUpdatedAt
      ).not.toBeCalled();
      expect(vehicle).toEqual(mockVehicle);
    });

    it("should return vehicle detail with original state when state log is not found", async () => {
      const mockVehicleRepository: IVehicleRepository = {
        getById: jest.fn().mockResolvedValue(mockVehicle),
      };
      const mockStateLogRepository: IStateLogRepository = {
        getVehicleLastStateUpdatedAt: jest.fn().mockResolvedValue(undefined),
      };

      const vehicleService = new VehicleService(
        mockVehicleRepository,
        mockStateLogRepository
      );
      const vehicle = await vehicleService.getVehicle(1, {
        stateUpdatedAt: mockDatetime,
      });

      expect(mockStateLogRepository.getVehicleLastStateUpdatedAt).toBeCalled();
      expect(vehicle).toEqual(mockVehicle);
    });

    it("should return undefined when vehicle is not found", async () => {
      const mockVehicleRepository: IVehicleRepository = {
        getById: jest.fn().mockResolvedValue(undefined),
      };
      const mockStateLogRepository: IStateLogRepository = {
        getVehicleLastStateUpdatedAt: jest.fn(),
      };

      const vehicleService = new VehicleService(
        mockVehicleRepository,
        mockStateLogRepository
      );
      const vehicle = await vehicleService.getVehicle(1, {});
      expect(
        mockStateLogRepository.getVehicleLastStateUpdatedAt
      ).not.toBeCalled();
      expect(vehicle).toBeUndefined();
    });
  });
});
