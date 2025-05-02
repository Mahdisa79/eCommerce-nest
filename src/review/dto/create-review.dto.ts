import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
    @IsOptional()
    @IsString()
    content:string;
   

    @IsNumber()
    @Min(1)
    @Max(5)
    rating:number;
    
    @IsInt()
    productId : number


}
