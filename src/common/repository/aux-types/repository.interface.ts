import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export interface Repository<T, TClass> {
  findById(id: string): Promise<T | null>;

  findOne(query: Record<string, any>): Promise<T | null>;

  find(
    query: Record<string, any>,
    skip?: number,
    count?: number,
    sort?: string | any,
  ): Promise<Array<T>>;

  create(data: TClass): Promise<T>;

  save(data: T): Promise<T>;

  findByIdAndUpdate(id: string, diff: any, populate?: any): Promise<T | null>;

  updateOne(query: Record<string, any>, diff: any): Promise<void>;

  remove(id: string): Promise<T>;

  count(query: Record<string, any>): Promise<number>;

  aggregate(
    query: any,
    collation?: any,
    allowDiskUse?: boolean,
  ): Promise<Array<T>>;
}

export class RepositoryTransaction {
  constructor(
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async startSession(): Promise<mongoose.ClientSession> {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }

  async commitSession(session: mongoose.ClientSession): Promise<void> {
    await session.commitTransaction();
  }

  async abortTransaction(session: mongoose.ClientSession): Promise<void> {
    await session.abortTransaction();
  }

  async endSession(session: mongoose.ClientSession): Promise<void> {
    session.endSession();
  }
}
