import { Vehicle } from "../model/vehicle";
import { IInMemCacheRepository } from "../repository/IInMemCache";
import { IVehicleService } from "./IVehicleService";
import { VehicleCacheService } from "./vehicleCacheService";

describe("Vehicle Cache Service Test Suite", () => {
  describe("getVehicle", () => {
    const mockDatetime = new Date("2023-02-25T00:55:05.183Z");
    const mockVehicle = new Vehicle(1, "BMW", "X1", "selling");

    it("should set value with cacheKey getVehicle_1_2023-02-25T00:55:05Z to cache", async () => {
      const mockInMemCacheRepository: IInMemCacheRepository = {
        get: jest.fn().mockResolvedValue(undefined),
        set: jest.fn(),
      };
      const mockVehicheService: IVehicleService = {
        getVehicle: jest.fn().mockResolvedValue(mockVehicle),
      };
      const vehicleCacheService = new VehicleCacheService(
        mockVehicheService,
        mockInMemCacheRepository
      );
      const vehicle = await vehicleCacheService.getVehicle(1, {
        stateUpdatedAt: mockDatetime,
      });
      expect(mockInMemCacheRepository.get).toBeCalledWith(
        "getVehicle_1_2023-02-25T00:55:05Z"
      );
      expect(mockInMemCacheRepository.set).toBeCalled();
      expect(vehicle).toEqual(mockVehicle);
    });

    it("should set value with cacheKey getVehicle_1 to cache", async () => {
      const mockInMemCacheRepository: IInMemCacheRepository = {
        get: jest.fn().mockResolvedValue(undefined),
        set: jest.fn(),
      };
      const mockVehicheService: IVehicleService = {
        getVehicle: jest.fn().mockResolvedValue(mockVehicle),
      };
      const vehicleCacheService = new VehicleCacheService(
        mockVehicheService,
        mockInMemCacheRepository
      );
      const vehicle = await vehicleCacheService.getVehicle(1, {});

      expect(mockInMemCacheRepository.get).toBeCalledWith("getVehicle_1");
      expect(mockInMemCacheRepository.set).toBeCalled();
      expect(vehicle).toEqual(mockVehicle);
    });

    it("should not set value when vehicle is not found", async () => {
      const mockInMemCacheRepository: IInMemCacheRepository = {
        get: jest.fn().mockResolvedValue(undefined),
        set: jest.fn(),
      };
      const mockVehicheService: IVehicleService = {
        getVehicle: jest.fn().mockResolvedValue(undefined),
      };
      const vehicleCacheService = new VehicleCacheService(
        mockVehicheService,
        mockInMemCacheRepository
      );
      const vehicle = await vehicleCacheService.getVehicle(1, {});

      expect(mockInMemCacheRepository.get).toBeCalledWith("getVehicle_1");
      expect(mockInMemCacheRepository.set).not.toBeCalled();
      expect(vehicle).toBeUndefined();
    });

    it("should get existing value with cacheKey getVehicle_1_2023-02-25T00:55:05Z from cache", async () => {
      const mockInMemCacheRepository: IInMemCacheRepository = {
        get: jest.fn().mockResolvedValue(mockVehicle),
        set: jest.fn(),
      };
      const mockVehicheService: IVehicleService = {
        getVehicle: jest.fn(),
      };
      const vehicleCacheService = new VehicleCacheService(
        mockVehicheService,
        mockInMemCacheRepository
      );
      const vehicle = await vehicleCacheService.getVehicle(1, {
        stateUpdatedAt: mockDatetime,
      });
      expect(mockInMemCacheRepository.get).toBeCalledWith(
        "getVehicle_1_2023-02-25T00:55:05Z"
      );
      expect(mockInMemCacheRepository.set).not.toBeCalled();
      expect(mockVehicheService.getVehicle).not.toBeCalled();
      expect(vehicle).toEqual(mockVehicle);
    });
  });
});
