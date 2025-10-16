import { Injectable, NotFoundException } from '@nestjs/common';
import { FavoriteRepo, ModuleRepo } from '@keuzekompas/infrastructure';

@Injectable()
export class FavoritesService {
  constructor(private readonly favs: FavoriteRepo, private readonly modules: ModuleRepo) {}

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
