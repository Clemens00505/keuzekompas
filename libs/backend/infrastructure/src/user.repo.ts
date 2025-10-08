import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

export class UserRepo {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  findByEmail(email: string) {
    return this.model.findOne({ email: email.toLowerCase().trim() }).lean();
  }
}
