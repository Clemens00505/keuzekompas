import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { FavoritesRepository, ModulesRepository } from '@keuzekompas/domain';
import { FAVORITES_REPOSITORY, MODULES_REPOSITORY } from '@keuzekompas/domain';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(FAVORITES_REPOSITORY) private readonly favs: FavoritesRepository,
    @Inject(MODULES_REPOSITORY) private readonly modules: ModulesRepository,
  ) {}

  list(userId: string) {
    return this.favs.listByUser(userId);
  }

  async add(userId: string, moduleId: string) {
    // best-effort check dat module bestaat
    const m = await this.modules.get(moduleId);
    if (!m) throw new NotFoundException('Module niet gevonden');
    return this.favs.add(userId, moduleId);
  }

  remove(userId: string, moduleId: string) {
    return this.favs.remove(userId, moduleId);
  }
}
