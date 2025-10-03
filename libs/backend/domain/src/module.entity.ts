export class ModuleEntity {
  constructor(
    public id: string,
    public name: string,
    public ec: 15 | 30,
    public niveau: 'NLQF-5' | 'NLQF-6',
    public thema: string[] = []
  ) {}
}
