import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  private client: Redis;

  constructor() {
    // Initialize Redis client
    this.client = new Redis({
      host: process.env.REDIS_HOST || 'localhost', // Redis server hostname
      port:  6379,        // Redis server port
      password: 'your_password', // Optional, if your Redis server requires authentication
      db: 0,             // Optional, select the Redis database to use (default is 0)
    });
  }

  // Get value from cache
  async get<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  // Set value in cache with TTL (Time To Live)
  async set<T>(key: string, value: T, ttl: number): Promise<void> {
    await this.client.setex(key, ttl, JSON.stringify(value));
  }

  // Delete value from cache
  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }

  // Invalidate cache for a specific key
  async invalidate(key: string): Promise<void> {
    await this.delete(key);
  }
}
