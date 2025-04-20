import { BadRequestException, Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVariantItemDto } from './dto/create-variant-item.dto';
import { UpdateVariantItemDto } from './dto/update-variant-item.dto';
import { VariantItem } from './entities/variant-item.entity';
import { VariantsService } from 'src/variants/variants.service';

@Injectable()
export class VariantItemsService {

  constructor(
    @InjectRepository(VariantItem) private variantItemRepository: Repository<VariantItem>,
    private variantService : VariantsService
  ){}

  async create(createVariantItemDto: CreateVariantItemDto) {
    const variant = await this.variantService.findOne(createVariantItemDto.variantId);
    const variantItem = new VariantItem();
    variantItem.variant = variant;
    Object.assign(variantItem,createVariantItemDto)

    return this.variantItemRepository.save(variantItem);
  }

  async findAll(variantId:number) {
    const variant = await this.variantService.findOne(variantId);

    return this.variantItemRepository.find({where:{variant}})
  }

  async findOne(id: number) {
    const variantItem = await this.variantItemRepository.find({where:{id}})
  
    if(!variantItem)
      throw new BadRequestException(`variantItem ${variantItem} Not Founded`)

    return variantItem;
  }

  async remove(id: number) {
    const variantItem = await this.findOne(id)
    await this.variantItemRepository.remove(variantItem);

  }
}
