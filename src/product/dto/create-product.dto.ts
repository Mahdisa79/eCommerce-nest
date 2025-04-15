import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator"

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    @Length(0,100)
    name:string

    @IsNotEmpty()
    @IsNumber()
    price:number


    @IsOptional()
    @IsNumber()
    offerPrice:number

    @IsNotEmpty()
    @IsString()
    @Length(0,255)
    shortDescription:string


    @IsString()
    longDescription:string


    @IsNotEmpty()
    @IsInt()
    quantity:number


    @IsNotEmpty()
    @IsInt()
    categoryId:number;


}
