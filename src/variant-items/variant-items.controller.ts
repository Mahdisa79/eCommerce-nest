import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { VariantItemsService } from './variant-items.service';
import { CreateVariantItemDto } from './dto/create-variant-item.dto';
import { UpdateVariantItemDto } from './dto/update-variant-item.dto';
import { API_VERSION } from 'src/cores/constants/app.constant';
import { TransformDTO } from 'src/cores/interceptors/transform-dto.interceptor';
import { ResponseVariantItemDto } from './dto/response-variant-item.dto';

@Controller(`${API_VERSION}/variant-items`)
@TransformDTO(ResponseVariantItemDto)
export class VariantItemsController {
  constructor(private readonly variantItemsService: VariantItemsService) {}

  @Post()
  create(@Body() createVariantItemDto: CreateVariantItemDto) {
    return this.variantItemsService.create(createVariantItemDto);
  }

  @Get('/:variantId/variant')
  findAll(@Param('variantId',ParseIntPipe) variantId : number ) {
    return this.variantItemsService.findAll(variantId);
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.variantItemsService.findOne(id);
  }


  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.variantItemsService.remove(id);
  }
}
