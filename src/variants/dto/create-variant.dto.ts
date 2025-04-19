import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateVariantDto {
    @IsNotEmpty()
    @IsString()
    name:string


    @IsNotEmpty()
    @IsInt()
    productId:number
}
