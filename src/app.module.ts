import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { environmentValidator } from './config/environment.validator';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './module/auth/guard/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasource } from './database/datasource';
import { UsersModule } from './module/users/users.module';
import { ImagesModule } from './module/images/images.module';
import { AuthModule } from './module/auth/auth.module';
import s3Config from './config/s3.config';
import { S3Module } from './module/s3/s3.module';
import { seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import redisConfig from './config/redis.config';
import { RedisModule } from './module/redis/redis.module';

@Module({
  imports: [
    UsersModule,
    ImagesModule,
    AuthModule,
    S3Module,
    RedisModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...datasource.options,
      }),
      dataSourceFactory: async () => {
        if (datasource.isInitialized) {
          return datasource;
        }

        return datasource.initialize();
      },
    }),
    ConfigModule.forRoot({
      cache: true,
      envFilePath: '.env',
      isGlobal: true,
      load: [jwtConfig, s3Config, redisConfig],
      validationSchema: environmentValidator,
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.expires.access'),
        },
      }),
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: seconds(60),
          limit: 10,
        },
      ],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
