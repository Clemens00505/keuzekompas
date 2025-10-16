import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ModulesService } from '@keuzekompas/application';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Controller('modules')
export class ModulesController {
  constructor(private readonly svc: ModulesService) {}

  @Get()
  list(
    @Query('q') q?: string,
    @Query('ec') ec?: string,
    @Query('niveau') niveau?: string,
    @Query('thema') thema?: string,
  ) {
    return this.svc.list({
      search: q,
      ec: ec ? Number(ec) : undefined,
      niveau,
      thema,
    });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.svc.get(id);
  }
}
