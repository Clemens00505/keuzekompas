import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ModulesService } from '@keuzekompas/application';
import { InMemoryModulesRepo } from '@keuzekompas/infrastructure';

@Controller('modules')
export class ModulesController {
  private readonly service = new ModulesService(new InMemoryModulesRepo());

  @Get()
  getAll() {
    return this.service.list();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.get(id);
  }

  @Post()
  create(@Body() dto: { name: string; ec: 15 | 30; niveau: 'NLQF-5' | 'NLQF-6'; thema?: string[] }) {
    return this.service.create(dto);
  }
}
