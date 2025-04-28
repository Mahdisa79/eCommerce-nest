import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShippingRuleDto } from './dto/create-shipping-rule.dto';
import { UpdateShippingRuleDto } from './dto/update-shipping-rule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShippingRule } from './entities/shipping-rule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShippingRuleService {
  constructor(@InjectRepository(ShippingRule) private  shippingRuleRepository : Repository<ShippingRule>){

  }
  async create(createShippingRuleDto: CreateShippingRuleDto) {
    const shippingRule = new ShippingRule();
    shippingRule.type = createShippingRuleDto.type;
    shippingRule.cost = createShippingRuleDto.cost;
    shippingRule.estimateDay = createShippingRuleDto.estimateDay;

    return this.shippingRuleRepository.save(shippingRule);
  }

  findAll() {
    return this.shippingRuleRepository.find({where:{status:true}});
  }


  async findOne(id: number) {
    const shippingRule = await this.shippingRuleRepository.findOne({where:{status:true,id}});
    if(!shippingRule) throw new NotFoundException(`shippingRule ${id} Not Founded`)
    return shippingRule
  }

  update(id: number, updateShippingRuleDto: UpdateShippingRuleDto) {
    return `This action updates a #${id} shippingRule`;
  }

  remove(id: number) {
    return `This action removes a #${id} shippingRule`;
  }
}
