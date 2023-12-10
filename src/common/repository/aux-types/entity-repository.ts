import { Model, Document } from 'mongoose';
import { Repository } from './repository.interface';
import { Logger } from '@nestjs/common';

export abstract class EntityRepository<T extends Document, TClass>
  implements Repository<T, TClass>
{
  private readonly logger = new Logger(this.constructor.name, {
    timestamp: true,
  });

  constructor(protected readonly entityModel: Model<T>) {}

  async findById(id: string, populate?: any): Promise<T> {
    try {
      let data;
      if (populate) {
        data = await this.entityModel.findById(id).populate(populate);
      } else {
        data = await this.entityModel.findById(id);
      }
      if (!data) {
        throw 'not found';
      }
      return data;
    } catch (error) {
      this.logger.error('EntityRepository - findById: ', error);
      throw error;
    }
  }

  async findOne(query: any, populate?: any, sort?: any): Promise<T | null> {
    try {
      let data;
      if (populate) {
        data = await this.entityModel.findOne(query).populate(populate);
      } else {
        data = await this.entityModel.findOne(query);
      }
      if (sort) {
        data = await this.entityModel.findOne(query).sort(sort);
      }
      return data;
    } catch (error) {
      this.logger.error('EntityRepository - findOne: ', error);
      throw error;
    }
  }

  async find(
    query: Record<string, any>,
    skip?: number,
    count?: number,
    sort?: string | any,
    projectedFields?: any,
    populate?: any,
  ): Promise<T[]> {
    try {
      if (!skip && !count && !sort) {
        if (projectedFields && populate) {
          return await this.entityModel
            .find(query, projectedFields)
            .populate(populate);
        }
        if (projectedFields) {
          return await this.entityModel.find(query, projectedFields);
        }
        if (populate) {
          return await this.entityModel.find(query).populate(populate);
        }
        return await this.entityModel.find(query);
      }
      if (count && count > 0 && Number.isInteger(skip) && skip !== undefined) {
        return await this.entityModel
          .find(query)
          .populate(populate)
          .skip(skip)
          .limit(count)
          .sort(sort);
      } else {
        return await this.entityModel.find(query).populate(populate).sort(sort);
      }
    } catch (error) {
      this.logger.error('EntityRepository - find: ', error);
      throw error;
    }
  }

  async create(dataToCreate: TClass): Promise<T> {
    try {
      const data = await this.entityModel.create(dataToCreate);
      if (!data) {
        throw 'not found';
      }
      return data;
    } catch (error) {
      this.logger.error('EntityRepository - create: ', error);
      throw error;
    }
  }

  async count(query: any): Promise<number> {
    try {
      const count = await this.entityModel.countDocuments(query);
      return count;
    } catch (error) {
      this.logger.error('EntityRepository - count: ', error);
      throw error;
    }
  }

  async findByIdAndUpdate(id: string, diff: any, populate?: any): Promise<T> {
    try {
      let data;
      if (populate) {
        data = await this.entityModel
          .findByIdAndUpdate(id, diff, { new: true })
          .populate(populate);
      } else {
        data = await this.entityModel.findByIdAndUpdate(id, diff, {
          new: true,
        });
      }
      if (!data) {
        throw 'not found';
      }
      return data;
    } catch (error) {
      this.logger.error('EntityRepository - findByIdAndUpdate: ', error);
      throw error;
    }
  }

  async save(dataToSave: T): Promise<T> {
    try {
      const data = await dataToSave.save();
      if (!data) {
        throw 'not found';
      }
      return data;
    } catch (error) {
      this.logger.error('EntityRepository - save: ', error);
      throw error;
    }
  }

  async remove(id: string): Promise<T> {
    try {
      const data = (await this.entityModel.findByIdAndDelete(id)).value;
      if (!data) {
        throw new Error('not found');
      }
      return data;
    } catch (error) {
      this.logger.error('EntityRepository - remove: ', error);
      throw error;
    }
  }

  async aggregate(
    query: any,
    collation?: any,
    allowDiskUse?: boolean,
  ): Promise<any> {
    try {
      if (allowDiskUse) {
        return await this.entityModel.aggregate(query).allowDiskUse(true);
      }
      if (collation) {
        return await this.entityModel.aggregate(query).collation(collation);
      }
      return await this.entityModel.aggregate(query);
    } catch (error) {
      this.logger.error('EntityRepository - aggregate: ', error);
      throw error;
    }
  }

  async updateOne(query: Record<string, any>, diff: any): Promise<void> {
    try {
      await this.entityModel.updateOne(query, diff);
    } catch (error) {
      this.logger.error('EntityRepository - updateOne: ', error);
      throw error;
    }
  }

  async updateMany(
    query: Record<string, any>,
    diff: any,
    options?: any,
  ): Promise<void> {
    try {
      if (options) {
        await this.entityModel.updateMany(query, diff, options);
      } else {
        await this.entityModel.updateMany(query, diff);
      }
    } catch (error) {
      this.logger.error('EntityRepository - updateMany: ', error);
      throw error;
    }
  }

  async insertMany(docs: Record<string, any>): Promise<T[]> {
    try {
      const documents = await this.entityModel.insertMany(docs, {
        lean: true,
      });
      return documents as T[];
    } catch (error) {
      this.logger.error('EntityRepository - insertMany: ', error);
      throw error;
    }
  }

  async bulkWrite(bulkOperations: any[]): Promise<any> {
    try {
      const documents = await this.entityModel.bulkWrite(bulkOperations);
      return documents;
    } catch (error) {
      this.logger.error('EntityRepository - bulkWrite: ', error);
      throw error;
    }
  }
}
