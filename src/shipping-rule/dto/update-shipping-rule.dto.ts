import { PartialType } from '@nestjs/swagger';
import { CreateShippingRuleDto } from './create-shipping-rule.dto';

export class UpdateShippingRuleDto extends PartialType(CreateShippingRuleDto) {}
