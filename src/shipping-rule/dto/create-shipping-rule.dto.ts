import { IsDate, IsIn, IsInt, IsNotEmpty, IsNumber } from "class-validator";
import { SHIPPING_RULE_TYPE } from "../entities/shipping-rule.entity";

export class CreateShippingRuleDto {

    @IsNotEmpty()
    @IsIn(['very fast','fast','normal'])
    type:SHIPPING_RULE_TYPE;

    @IsNotEmpty()
    @IsNumber()
    cost:number;

    @IsNotEmpty()
    @IsInt()
    estimateDay:number;

}
