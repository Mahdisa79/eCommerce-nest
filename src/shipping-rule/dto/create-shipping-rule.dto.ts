import { IsDate, IsIn, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateShippingRuleDto {

    @IsNotEmpty()
    @IsString()
    type:string;

    @IsNotEmpty()
    @IsNumber()
    cost:number;

    @IsNotEmpty()
    @IsInt()
    estimateDay:number;

}
