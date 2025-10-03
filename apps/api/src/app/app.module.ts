import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { Module as ModuleModel, ModuleSchema } from '@keuzekompas/infrastructure';
import { ModuleRepo } from '@keuzekompas/infrastructure';
import { ModulesService } from '@keuzekompas/application';
import { ModulesController } from '@keuzekompas/api-code';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    MongooseModule.forFeature([{ name: ModuleModel.name, schema: ModuleSchema }]),
  ],
  controllers: [ModulesController],
  providers: [ModuleRepo, ModulesService],
})
export class AppModule {}
