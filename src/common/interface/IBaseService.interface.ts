export interface IBaseService<T> {
  findById(id: string): Promise<T | null>;

  findByIdAndUpdate(id: string, doc: any): Promise<T | null>;

  findByIdAndDelete(id: string, doc: any, populate?: any): Promise<T | null>;

  findOne(query: Record<string, any>, sort?: any): Promise<T | null>;

  updateOne(query: Record<string, any>, doc: any): Promise<void>;

  find(
    query: Record<string, any>,
    skip?: number,
    limit?: number,
    sort?: string | any,
  ): Promise<Array<T>>;

  create(data: T): Promise<T>;

  save(data: T): Promise<T>;

  count(query: Record<string, any>): Promise<number>;

  aggregate(
    query: any,
    skip?: number,
    limit?: number,
    collation?: any,
  ): Promise<any>;
}
