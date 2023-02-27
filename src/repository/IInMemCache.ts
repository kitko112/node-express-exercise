export interface IInMemCacheRepository {
  get<T>(key: string): Promise<T | undefined>;
  set<T>(key: string, value: T, ttlInSeconds: number): Promise<void>;
}
