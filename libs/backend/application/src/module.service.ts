import { Injectable, NotFoundException } from '@nestjs/common';
import { ModuleRepo } from '@keuzekompas/infrastructure';

@Injectable()
export class ModulesService {
  constructor(private readonly repo: ModuleRepo) {}

  list(q?: { search?: string; ec?: number; niveau?: string; thema?: string }) {
    return this.repo.list(q);
  }

  async get(id: string) {
    const m = await this.repo.get(id);
    if (!m) throw new NotFoundException('Module not found');
    return m;
  }
}
