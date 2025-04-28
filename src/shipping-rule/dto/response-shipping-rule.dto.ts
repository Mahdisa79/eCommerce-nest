import { Expose } from "class-transformer";

export class ResponseShippingRuleDto {

    @Expose()
    id:number

    @Expose()
    type:string;

    
    @Expose()
    cost:number;


    @Expose()
    estimateDay:number;

}
