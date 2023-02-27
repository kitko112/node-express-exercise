import { RedisClientType } from "redis";
import { IInMemCacheRepository } from "./IInMemCache";

export class RedisCacheRepository implements IInMemCacheRepository {
  private _redisClient: RedisClientType;

  constructor(redisClient: RedisClientType) {
    this._redisClient = redisClient;
  }

  async set<T>(key: string, value: T, ttlInSeconds: number): Promise<void> {
    await this._redisClient.set(key, JSON.stringify(value), {
      EX: ttlInSeconds,
    });
  }

  async get<T>(key: string): Promise<T | undefined> {
    const value = await this._redisClient.get(key);
    return value ? JSON.parse(value) : undefined;
  }
}
