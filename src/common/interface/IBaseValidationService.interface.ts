export interface IBaseValidationService<T> {
  createValidation(body: T | undefined): Promise<boolean>;
  updateValidation(body: T | undefined): Promise<boolean>;
  deleteValidation(body: T | undefined): Promise<boolean>;
  findValidation(body: T | undefined): Promise<boolean>;
}
