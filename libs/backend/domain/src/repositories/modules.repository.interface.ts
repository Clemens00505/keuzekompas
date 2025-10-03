import { ModuleEntity } from '../module.entity';

export interface IModulesRepository {
  findAll(): Promise<ModuleEntity[]> | ModuleEntity[];
  findOne(id: string): Promise<ModuleEntity | null> | ModuleEntity | null;
  create(dto: { name: string; ec: 15 | 30; niveau: 'NLQF-5' | 'NLQF-6'; thema?: string[] }): Promise<ModuleEntity> | ModuleEntity;
}