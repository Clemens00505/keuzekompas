import { ModuleEntity, IModulesRepository } from '@keuzekompas/domain';
import { randomUUID } from 'crypto';

export class InMemoryModulesRepo implements IModulesRepository {
  private modules: ModuleEntity[] = [
    new ModuleEntity(randomUUID(), 'Data Visualisatie', 15, 'NLQF-5', ['BI']),
    new ModuleEntity(randomUUID(), 'Web Performance', 30, 'NLQF-6', ['Web', 'Perf']),
  ];

  findAll() {
    return [...this.modules];
  }

  findOne(id: string) {
    return this.modules.find(m => m.id === id) ?? null;
  }

  create(dto: { name: string; ec: 15 | 30; niveau: 'NLQF-5' | 'NLQF-6'; thema?: string[] }) {
    const entity = new ModuleEntity(randomUUID(), dto.name, dto.ec, dto.niveau, dto.thema ?? []);
    this.modules.push(entity);
    return entity;
  }
}
