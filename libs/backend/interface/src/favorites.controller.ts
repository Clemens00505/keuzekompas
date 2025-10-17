import { Controller, Get, Post, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { FavoritesService } from '@keuzekompas/application';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly svc: FavoritesService) {}

  @Get()
  list(@Req() req: any) {
    const userId = String(req.user.id);
    return this.svc.list(userId);
  }

  @Post(':moduleId')
  add(@Req() req: any, @Param('moduleId') moduleId: string) {
    const userId = String(req.user.id);
    return this.svc.add(userId, moduleId);
  }

  @Delete(':moduleId')
  remove(@Req() req: any, @Param('moduleId') moduleId: string) {
    const userId = String(req.user.id);
    return this.svc.remove(userId, moduleId);
  }
}
