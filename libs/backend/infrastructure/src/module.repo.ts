import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Module, ModuleDocument } from './schemas/module.schema';

export class ModuleRepo {
  constructor(@InjectModel(Module.name) private model: Model<ModuleDocument>) {}

  list(q?: { search?: string; ec?: number; niveau?: string; thema?: string }) {
    const query: any = {};
    if (q?.search) query.$text = { $search: q.search };
    if (q?.ec) query.ec = q.ec;
    if (q?.niveau) query.niveau = q.niveau;
    if (q?.thema) query.thema = q.thema.toLowerCase();
    return this.model.find(query).limit(50).lean();
  }

  get(id: string) {
    return this.model.findById(id).lean();
  }
}
