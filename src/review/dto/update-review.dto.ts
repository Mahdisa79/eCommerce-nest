import { PartialType } from '@nestjs/swagger';
import { CreateReviewDto } from './create-review.dto';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateReviewDto {
    @IsOptional()
    @IsString()
    content:string;
   
    
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(5)
    rating:number;   
}
