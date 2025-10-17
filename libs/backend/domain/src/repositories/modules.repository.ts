export interface ModulesRepository {
  list(q?: { search?: string; ec?: number; niveau?: string; thema?: string }): Promise<any[]> | any[];
  get(id: string): Promise<any | null> | any | null;
}
