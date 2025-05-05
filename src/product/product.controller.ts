import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { TransformDTO } from 'src/cores/interceptors/transform-dto.interceptor';
import { ResponseProductDto } from './dto/response-product.dto';
import { API_VERSION } from 'src/cores/constants/app.constant';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { AuthGuard } from 'src/cores/guards/auth.guard';

@Controller(`${API_VERSION}/products`)
@TransformDTO(ResponseProductDto)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.productService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Get('slug/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.productService.findOneBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)

  remove(@Param('id',ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
