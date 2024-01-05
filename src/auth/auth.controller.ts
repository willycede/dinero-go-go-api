import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from './jwt/jwt.service';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Post('login')
  async login(@Body() body) {
    return this.jwtService.createAccessToken(body.user);
  }
}
