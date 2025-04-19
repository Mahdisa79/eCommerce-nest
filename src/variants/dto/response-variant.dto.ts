
import { Expose } from "class-transformer";

export class ResponseVariantDto {

    @Expose()
    id:number

    @Expose()
    name:string


    @Expose()
    productId:number
}
