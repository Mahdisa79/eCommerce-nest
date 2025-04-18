import { Module } from '@nestjs/common';
import { ProductGalleriesService } from './product-galleries.service';
import { ProductGalleriesController } from './product-galleries.controller';

@Module({
  controllers: [ProductGalleriesController],
  providers: [ProductGalleriesService],
})
export class ProductGalleriesModule {}
