import { Module } from '@nestjs/common';
import { ShippingRuleService } from './shipping-rule.service';
import { ShippingRuleController } from './shipping-rule.controller';

@Module({
  controllers: [ShippingRuleController],
  providers: [ShippingRuleService],
})
export class ShippingRuleModule {}
