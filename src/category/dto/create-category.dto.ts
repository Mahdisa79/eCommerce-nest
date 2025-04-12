import { IsNotEmpty, IsNumber, IsOptional } from "class-validator"


export class CreateCategoryDto {
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    description:string



    @IsNumber()
    @IsOptional()
    parentId:number | null = null

}
