import { Expose } from "class-transformer";
import { SHIPPING_RULE_TYPE } from "../entities/shipping-rule.entity";

export class ResponseShippingRuleDto {

    @Expose()
    type:SHIPPING_RULE_TYPE;

    
    @Expose()
    cost:number;


    @Expose()
    estimateDay:number;

}
