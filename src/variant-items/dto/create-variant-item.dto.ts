import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateVariantItemDto {
    @IsNotEmpty()
    @IsString()
    value:string

    @IsNotEmpty()
    @IsInt()
    variantId:number

    @IsNotEmpty()
    @IsNumber()
    price:number

}
