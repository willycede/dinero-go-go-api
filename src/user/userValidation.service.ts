import { User } from 'src/user/user.model';
import { IBaseValidationService } from '../common/interface/IBaseValidationService.interface';
export class UserValidationService implements IBaseValidationService<User> {
  createValidation(body: User): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  updateValidation(body: User): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  deleteValidation(body: User): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findValidation(body: User): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
