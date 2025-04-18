import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { API_VERSION } from 'src/cores/constants/app.constant';
import { ProductGalleriesService } from './product-galleries.service';

@Controller(`${API_VERSION}/product-galleries`)
export class ProductGalleriesController {
  constructor(private readonly productGalleriesService: ProductGalleriesService) {}

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    this.productGalleriesService.remove(id);
    return {message :'success'}
  }
}
