import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { API_VERSION } from 'src/cores/constants/app.constant';
import { TransformDTO } from 'src/cores/interceptors/transform-dto.interceptor';
import { ResponseVariantDto } from './dto/response-variant.dto';

@Controller(`${API_VERSION}/variants`)
@TransformDTO(ResponseVariantDto)
export class VariantsController {
  constructor(private readonly variantsService: VariantsService) {}

  @Post()
  create(@Body() createVariantDto: CreateVariantDto) {
    return this.variantsService.create(createVariantDto);
  }

  @Get('/:productId/product')
  findAll(@Param('productId' , ParseIntPipe) productId : number) {
    return this.variantsService.findAll(productId);
  }

  @Get(':id')
  findOne(@Param('id' , ParseIntPipe) id: number) {
    return this.variantsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVariantDto: UpdateVariantDto) {
    return this.variantsService.update(+id, updateVariantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variantsService.remove(+id);
  }
}
