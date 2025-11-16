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

@Injectable()
export class ImagesService {
  private modelAction: ModelAction<Image>;
  constructor(
    private readonly s3Service: S3Service,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {
    this.modelAction = new ModelAction(imageRepository);
  }

  async uploadImage(file) {
    const url = await this.s3Service.uploadFile(file);

    const record = await this.modelAction.create(url);

    return {
      data: record,
    };
  }

  async transformImage(id: string, transformFilter: ITransform) {
    try {
      const imageExist = await this.modelAction.findOne(id);

      if (!imageExist) {
        throw new NotFoundException(SYS_MSG.ENTITY_NOT_FOUND);
      }

      return this.s3Service.transformImage(imageExist.url, transformFilter);
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
  }
}
