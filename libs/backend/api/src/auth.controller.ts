import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from '@keuzekompas/application';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }
}
