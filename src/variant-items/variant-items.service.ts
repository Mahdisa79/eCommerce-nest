import { Injectable } from '@nestjs/common';
import { CreateVariantItemDto } from './dto/create-variant-item.dto';
import { UpdateVariantItemDto } from './dto/update-variant-item.dto';

@Injectable()
export class VariantItemsService {
  create(createVariantItemDto: CreateVariantItemDto) {
    return 'This action adds a new variantItem';
  }

  findAll() {
    return `This action returns all variantItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variantItem`;
  }

  update(id: number, updateVariantItemDto: UpdateVariantItemDto) {
    return `This action updates a #${id} variantItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} variantItem`;
  }
}
