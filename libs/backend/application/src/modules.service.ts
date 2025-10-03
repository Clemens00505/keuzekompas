import { IModulesRepository } from '@keuzekompas/domain';

export class ModulesService {
  constructor(private readonly repo: IModulesRepository) {}

  list() {
    return this.repo.findAll();
  }

  get(id: string) {
    return this.repo.findOne(id);
  }

  create(dto: { name: string; ec: 15 | 30; niveau: 'NLQF-5' | 'NLQF-6'; thema?: string[] }) {
    return this.repo.create(dto);
  }
}
