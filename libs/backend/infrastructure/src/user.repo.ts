import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

export class UserRepo {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  findByEmail(email: string) {
    return this.model.findOne({ email: email.toLowerCase().trim() }).lean();
  }

  findById(id: string) {
    return this.model.findById(id).lean();
  }

  async updateById(id: string, update: Partial<Pick<User, 'firstName' | 'lastName'>>) {
    const doc = await this.model.findByIdAndUpdate(id, { $set: update }, { new: true }).lean();
    return doc;
  }
}
