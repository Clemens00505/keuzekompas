import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserSchema } from '@keuzekompas/infrastructure';
import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: ['log', 'error'] });
  try {
    const UserModel = app.get<any>(getModelToken(User.name));
    const email = process.env.SEED_EMAIL || 'student@example.com';
    const password = process.env.SEED_PASSWORD || 'password123';
    const existing = await UserModel.findOne({ email });
    if (existing) {
      console.log('User already exists:', email);
    } else {
      const passwordHash = await bcrypt.hash(password, 10);
      await UserModel.create({
        email,
        passwordHash,
        studentNumber: 's1234567',
        firstName: 'Test',
        lastName: 'Student',
      });
      console.log('Seeded user:', email, 'password:', password);
    }
  } catch (e) {
    console.error(e);
  } finally {
    await app.close();
  }
}

run();
