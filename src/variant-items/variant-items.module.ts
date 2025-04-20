import { Module } from '@nestjs/common';
import { VariantItemsService } from './variant-items.service';
import { VariantItemsController } from './variant-items.controller';

@Module({
  controllers: [VariantItemsController],
  providers: [VariantItemsService],
})
export class VariantItemsModule {}
