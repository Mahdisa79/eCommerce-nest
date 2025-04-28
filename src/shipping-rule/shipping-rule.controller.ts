import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ShippingRuleService } from './shipping-rule.service';
import { CreateShippingRuleDto } from './dto/create-shipping-rule.dto';
import { UpdateShippingRuleDto } from './dto/update-shipping-rule.dto';
import { API_VERSION } from 'src/cores/constants/app.constant';
import { TransformDTO } from 'src/cores/interceptors/transform-dto.interceptor';
import { ResponseShippingRuleDto } from './dto/response-shipping-rule.dto';

@Controller(`${API_VERSION}/shipping-rules`)
@TransformDTO(ResponseShippingRuleDto)
export class ShippingRuleController {
  constructor(private readonly shippingRuleService: ShippingRuleService) {}

  @Post()
  create(@Body() createShippingRuleDto: CreateShippingRuleDto) {
    return this.shippingRuleService.create(createShippingRuleDto);
  }

  @Get()
  findAll() {
    return this.shippingRuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.shippingRuleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateShippingRuleDto: UpdateShippingRuleDto) {
    return this.shippingRuleService.update(id, updateShippingRuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shippingRuleService.remove(+id);
  }
}
