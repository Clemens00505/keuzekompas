import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { Module as ModuleModel, ModuleSchema, User, UserSchema, Favorite, FavoriteSchema } from '@keuzekompas/infrastructure';
import { ModuleRepo, UserRepo, FavoriteRepo } from '@keuzekompas/infrastructure';
import { MODULES_REPOSITORY, USERS_REPOSITORY, FAVORITES_REPOSITORY } from '@keuzekompas/domain';
import { ModulesService, AuthService, UsersService, FavoritesService } from '@keuzekompas/application';
import { ModulesController, AuthController, ProfileController, FavoritesController } from '@keuzekompas/interface';
import { JwtModule } from '@nestjs/jwt';
import { sign } from 'crypto';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/keuzekompas'),
    MongooseModule.forFeature([
      { name: ModuleModel.name, schema: ModuleSchema },
      { name: User.name, schema: UserSchema },
      { name: Favorite.name, schema: FavoriteSchema },
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
    ProfileController,
    FavoritesController
  ],
  providers: [
    // Infrastructure implementations
    ModuleRepo,
    UserRepo,
    FavoriteRepo,
    // Application services
    ModulesService,
    AuthService,
    UsersService,
    FavoritesService,
    // Domain bindings
    { provide: MODULES_REPOSITORY, useExisting: ModuleRepo },
    { provide: USERS_REPOSITORY, useExisting: UserRepo },
    { provide: FAVORITES_REPOSITORY, useExisting: FavoriteRepo },
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }) },
  ],
})
export class AppModule {}