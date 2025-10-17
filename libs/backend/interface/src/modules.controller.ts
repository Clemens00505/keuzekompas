import { Controller, Get, Param, Query } from '@nestjs/common';
import { ModulesService } from '@keuzekompas/application';

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
