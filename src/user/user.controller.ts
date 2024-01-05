import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async users(): Promise<User[]> {
    return await this.userService.getUsers();
  }
}
