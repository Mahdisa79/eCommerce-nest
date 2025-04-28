import { IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateShippingRuleDto  {
    @IsOptional()
    @IsNumber()
    cost:number;

    // @IsNotEmpty()
    @IsOptional()
    @IsInt()
    estimateDay:number;
}
