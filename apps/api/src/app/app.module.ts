import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { Module as ModuleModel, ModuleSchema, User, UserSchema } from '@keuzekompas/infrastructure';
import { ModuleRepo, UserRepo } from '@keuzekompas/infrastructure';
import { ModulesService, AuthService, UsersService } from '@keuzekompas/application';
import { ModulesController, AuthController, ProfileController } from '@keuzekompas/api-code';
import { JwtModule } from '@nestjs/jwt';
import { sign } from 'crypto';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    MongooseModule.forFeature([
      { name: ModuleModel.name, schema: ModuleSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '2h' },
    }),
  ],
  controllers: [
    ModulesController,
    AuthController,
    ProfileController
  ],
  providers: [
    ModuleRepo, 
    ModulesService,
    AuthService,
    UsersService,
    UserRepo,
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }) },
  ],
})
export class AppModule {}