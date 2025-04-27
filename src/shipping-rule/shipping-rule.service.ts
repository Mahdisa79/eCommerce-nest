import { Injectable } from '@nestjs/common';
import { CreateShippingRuleDto } from './dto/create-shipping-rule.dto';
import { UpdateShippingRuleDto } from './dto/update-shipping-rule.dto';

@Injectable()
export class ShippingRuleService {
  create(createShippingRuleDto: CreateShippingRuleDto) {
    return 'This action adds a new shippingRule';
  }

  findAll() {
    return `This action returns all shippingRule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shippingRule`;
  }

  update(id: number, updateShippingRuleDto: UpdateShippingRuleDto) {
    return `This action updates a #${id} shippingRule`;
  }

  remove(id: number) {
    return `This action removes a #${id} shippingRule`;
  }
}
