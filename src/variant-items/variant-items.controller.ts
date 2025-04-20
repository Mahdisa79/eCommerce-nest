import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VariantItemsService } from './variant-items.service';
import { CreateVariantItemDto } from './dto/create-variant-item.dto';
import { UpdateVariantItemDto } from './dto/update-variant-item.dto';

@Controller('variant-items')
export class VariantItemsController {
  constructor(private readonly variantItemsService: VariantItemsService) {}

  @Post()
  create(@Body() createVariantItemDto: CreateVariantItemDto) {
    return this.variantItemsService.create(createVariantItemDto);
  }

  @Get()
  findAll() {
    return this.variantItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variantItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVariantItemDto: UpdateVariantItemDto) {
    return this.variantItemsService.update(+id, updateVariantItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variantItemsService.remove(+id);
  }
}
