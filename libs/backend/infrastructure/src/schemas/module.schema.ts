import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ModuleDocument = HydratedDocument<Module>;

@Schema({ timestamps: true })
export class Module {
  @Prop({ required: true, trim: true, index: true })
  name!: string;

  @Prop({ trim: true })
  location?: string;

  @Prop({ trim: true, maxlength: 1000 })
  description?: string;

  @Prop({ type: Number, enum: [15, 30], required: true })
  ec!: 15 | 30;

  @Prop({ type: String, enum: ['NLQF-5', 'NLQF-6'], required: true })
  niveau!: 'NLQF-5' | 'NLQF-6';

  @Prop({
    type: [String],
    default: [],
    set: (vals: string[]) => vals.map((v) => v.trim().toLowerCase()).filter(Boolean),
  })
  thema!: string[];
}
export const ModuleSchema = SchemaFactory.createForClass(Module);

// indexes voor zoeken/filters
ModuleSchema.index({ name: 'text' });
ModuleSchema.index({ ec: 1, niveau: 1 });
ModuleSchema.index({ thema: 1 });
