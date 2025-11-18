import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from '@upstash/redis';

@Injectable()
export class RedisService {
  private redis: Redis;
  constructor(private readonly configService: ConfigService) {
    this.redis = new Redis({
      url: configService.get('redis.url'),
      token: configService.get('redis.token'),
    });
  }

  async set(key: string, value: string) {
    await this.redis.set(key, JSON.stringify(value), {
      ex: 60,
    });
  }

  async get(key: string) {
    return this.redis.get(key);
  }
}
