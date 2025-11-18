import { S3Service } from '@/module/s3/s3.service';
import { ModelAction } from '@/shared/model-action';
import { ITransform } from '@/shared/types/transform';
import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Image } from '../model/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as SYS_MSG from '@/shared/system-message';
import { IPagination } from '@/shared/types/pagination';
import { RedisService } from '@/module/redis/redis.service';

@Injectable()
export class ImagesService {
  private modelAction: ModelAction<Image>;
  constructor(
    private readonly s3Service: S3Service,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly redisService: RedisService,
  ) {
    this.modelAction = new ModelAction(imageRepository);
  }

  async uploadImage(file: Express.Multer.File, userId: string) {
    const response = await this.s3Service.uploadFile(file);

    const record = await this.modelAction.create({
      user: { id: userId },
      url: response.url,
      key: response.key,
    });

    return {
      data: record,
      metadata: {
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        filename: file.filename,
      },
    };
  }

  async transformImage(
    id: string,
    transformFilter: ITransform,
    userId: string,
  ) {
    try {
      const imageExist = await this.modelAction.findOne(id);

      if (!imageExist) {
        throw new NotFoundException(SYS_MSG.ENTITY_NOT_FOUND);
      }

      const response = await this.s3Service.transformImage(
        imageExist.key,
        transformFilter,
      );

      const record = await this.modelAction.create({
        user: { id: userId },
        url: response.url,
        key: imageExist.key,
      });

      const result = await this.redisService.set(id, JSON.stringify(record));

      return {
        url: record.url,
      };
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
  }

  async retrieveImage(id: string) {
    try {
      const inRedis = await this.redisService.get(id);

      if (inRedis) {
        const parsed =
          typeof inRedis === 'string' ? JSON.parse(inRedis) : inRedis;
        return {
          data: parsed,
        };
      }
      const image = await this.modelAction.findOne(id);

      return image;
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
  }

  async getAllImage(query: IPagination) {
    try {
      const records = await this.modelAction.list(query);

      return {
        message: '',
        data: records,
      };
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
  }
}
