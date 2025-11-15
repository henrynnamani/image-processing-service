import { Injectable, NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FindOptionsOrder,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import * as SYS_MSG from '@/shared/system-message';

@Injectable()
export class ModelAction<T extends ObjectLiteral> {
  constructor(private readonly repository: Repository<T>) {}

  async save(data: DeepPartial<T> | DeepPartial<T[]>): Promise<T | T[]> {
    if (Array.isArray(data)) {
      return await this.repository.save(data as DeepPartial<T>[]);
    } else {
      return await this.repository.save(data as DeepPartial<T>);
    }
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);

    return this.repository.save(entity);
  }

  async createMany(data: DeepPartial<T[]>): Promise<T[]> {
    const entities = this.repository.create(data);

    return this.repository.save(entities);
  }

  async findAll(filter?: Partial<T>, relations?: string[]): Promise<T[]> {
    return this.repository.find({
      where: filter || {},
      order: { createdAt: 'DESC' } as any as FindOptionsOrder<T>,
      relations: relations || [],
    });
  }

  async findOne(id: string): Promise<T | null> {
    const entity = await this.repository.findOne({ where: { id } as any });

    if (!entity) throw new NotFoundException(SYS_MSG.ENTITY_NOT_FOUND);

    return entity;
  }

  async findBy(field: Partial<T>): Promise<T | null> {
    return this.repository.findOne({ where: field as any });
  }

  async update(id: string, data: DeepPartial<T>): Promise<T> {
    const entity = await this.repository.findOne({ where: { id } as any });

    if (!entity) throw new NotFoundException(SYS_MSG.ENTITY_NOT_FOUND);

    Object.assign(entity, data);

    return this.repository.save(entity);
  }

  async remove(id: string): Promise<T> {
    const entity = await this.repository.findOne({ where: { id } as any });

    if (!entity) throw new NotFoundException(SYS_MSG.ENTITY_NOT_FOUND);

    return this.repository.remove(entity);
  }
}
