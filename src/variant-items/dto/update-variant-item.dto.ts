import { PartialType } from '@nestjs/swagger';
import { CreateVariantItemDto } from './create-variant-item.dto';

export class UpdateVariantItemDto extends PartialType(CreateVariantItemDto) {}
