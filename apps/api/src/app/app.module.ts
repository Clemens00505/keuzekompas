import { Module } from '@nestjs/common';
import { ModulesController } from '@keuzekompas/api-code';

@Module({
  imports: [],
  controllers: [ModulesController],
  providers: [],
})
export class AppModule {}
