import { Expose, Transform } from "class-transformer";
import { Review } from "../entities/review.entity";

export class ResponseReviewDto {


    @Expose()
    id:number


    @Expose()
    content:string;
   

    @Expose()
    rating:number;
    
    @Expose()

    @Transform(({obj} : {obj:Review}) => obj.product?.id)
    productId : number


}
