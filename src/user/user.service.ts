import { Injectable, Logger } from '@nestjs/common';
import { IBaseService } from '../common/interface/IBaseService.interface';
import { User, UserDocument } from './user.model';
import { UserRepository } from '../common/repository/user.repository';

@Injectable()
export class UserService implements IBaseService<User> {
  private readonly logger = new Logger(this.constructor.name, {
    timestamp: true,
  });

  constructor(private userRepository: UserRepository) {}

  async count(query: any): Promise<number> {
    try {
      return await this.userRepository.count(query);
    } catch (error) {
      this.logger.error('count: ', error);
      throw error;
    }
  }

  async save(row: UserDocument): Promise<UserDocument> {
    try {
      return await this.userRepository.save(row);
    } catch (error) {
      this.logger.error('save: ', error);
      throw error;
    }
  }

  async findById(id: string): Promise<UserDocument | null> {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      this.logger.error('findById: ', error);
      throw error;
    }
  }

  async find(
    query: any,
    skip?: number,
    limit?: number,
    sort?: string | any,
  ): Promise<Array<UserDocument>> {
    try {
      return await this.userRepository.find(query, skip, limit, sort);
    } catch (error) {
      this.logger.error('find: ', error);
      throw error;
    }
  }

  async create(data: User): Promise<UserDocument> {
    try {
      return await this.userRepository.create(data);
    } catch (error) {
      this.logger.error('create: ', error);
      throw error;
    }
  }

  async aggregate(query: any, collation?: any): Promise<any> {
    try {
      if (collation) {
        return await this.userRepository.aggregate(query, collation);
      }
      return await this.userRepository.aggregate(query);
    } catch (error) {
      this.logger.error('aggregate: ', error);
      throw error;
    }
  }

  async findByIdAndUpdate(
    id: string,
    doc: any,
    populate?: any,
  ): Promise<UserDocument | null> {
    try {
      if (populate) {
        return await this.userRepository.findByIdAndUpdate(id, doc, populate);
      }
      return await this.userRepository.findByIdAndUpdate(id, doc);
    } catch (error) {
      this.logger.error('findByIdAndUpdate: ', error);
      throw error;
    }
  }

  async findByIdAndDelete(id: string): Promise<UserDocument | null> {
    try {
      return await this.userRepository.remove(id);
    } catch (error) {
      this.logger.error('findByIdAndDelete: ', error);
      throw error;
    }
  }

  async findOne(query: any): Promise<UserDocument | null> {
    try {
      return await this.userRepository.findOne(query);
    } catch (error) {
      this.logger.error('findOne: ', error);
      throw error;
    }
  }

  async updateOne(query: any, doc: any): Promise<void> {
    try {
      await this.userRepository.updateOne(query, doc);
    } catch (error) {
      this.logger.error('updateOne: ', error);
      throw error;
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find({ deleted: false });
    } catch (error) {
      this.logger.error('updateOne: ', error);
      throw error;
    }
  }
}
