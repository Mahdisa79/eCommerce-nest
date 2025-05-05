import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { API_VERSION } from 'src/cores/constants/app.constant';
import { TransformDTO } from 'src/cores/interceptors/transform-dto.interceptor';
import { ResponseVariantDto } from './dto/response-variant.dto';
import { AuthGuard } from 'src/cores/guards/auth.guard';

@Controller(`${API_VERSION}/variants`)
@TransformDTO(ResponseVariantDto)
export class VariantsController {
  constructor(private readonly variantsService: VariantsService) {}

  @Post()
  @UseGuards(AuthGuard)
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

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id' , ParseIntPipe) id: number) {
    return this.variantsService.remove(id);
  }
}
