import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Favorite, FavoriteDocument } from './schemas/favorite.schema';

export class FavoriteRepo {
  constructor(@InjectModel(Favorite.name) private model: Model<FavoriteDocument>) {}

  listByUser(userId: string) {
    return this.model.find({ userId: new Types.ObjectId(userId) }).lean();
  }

  async add(userId: string, moduleId: string) {
    const doc = await this.model.findOneAndUpdate(
      { userId: new Types.ObjectId(userId), moduleId: new Types.ObjectId(moduleId) },
      { $setOnInsert: { userId: new Types.ObjectId(userId), moduleId: new Types.ObjectId(moduleId) } },
      { upsert: true, new: true }
    ).lean();
    return doc;
  }

  async remove(userId: string, moduleId: string) {
    await this.model.deleteOne({ userId: new Types.ObjectId(userId), moduleId: new Types.ObjectId(moduleId) });
  }
}
