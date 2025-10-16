import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from '@keuzekompas/application';

@Controller()
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly users: UsersService) {}

  @Get('me')
  me(@Req() req: any) {
    const userId = String(req.user.id);
    return this.users.getById(userId);
  }

  @Patch('me')
  updateMe(@Req() req: any, @Body() dto: UpdateProfileDto) {
    const userId = String(req.user.id);
    return this.users.updateProfile(userId, dto);
  }
}
