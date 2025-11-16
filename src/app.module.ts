import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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

@Module({
  imports: [
    UsersModule,
    ImagesModule,
    AuthModule,
    S3Module,
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
      load: [jwtConfig, s3Config],
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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
