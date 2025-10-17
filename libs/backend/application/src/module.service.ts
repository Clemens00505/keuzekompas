import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ModulesRepository } from '@keuzekompas/domain';
import { MODULES_REPOSITORY } from '@keuzekompas/domain';

@Injectable()
export class ModulesService {
  constructor(@Inject(MODULES_REPOSITORY) private readonly repo: ModulesRepository) {}

  list(q?: { search?: string; ec?: number; niveau?: string; thema?: string }) {
    return this.repo.list(q);
  }

  async get(id: string) {
    const m = await this.repo.get(id);
    if (!m) throw new NotFoundException('Module not found');
    return m;
  }
}
