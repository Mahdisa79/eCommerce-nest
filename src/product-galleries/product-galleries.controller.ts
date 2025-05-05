import { Controller, Delete, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { API_VERSION } from 'src/cores/constants/app.constant';
import { ProductGalleriesService } from './product-galleries.service';
import { AuthGuard } from 'src/cores/guards/auth.guard';

@Controller(`${API_VERSION}/product-galleries`)
export class ProductGalleriesController {
  constructor(private readonly productGalleriesService: ProductGalleriesService) {}

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id',ParseIntPipe) id: number) {
    this.productGalleriesService.remove(id);
    return {message :'success'}
  }
}
