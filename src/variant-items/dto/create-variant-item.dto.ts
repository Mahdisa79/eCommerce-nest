import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateVariantItemDto {
    @IsNotEmpty()
    @IsString()
    value:string

    @IsNotEmpty()
    @IsInt()
    variantId:number

}
