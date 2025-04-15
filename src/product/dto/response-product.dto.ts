import { Expose, Transform } from "class-transformer"
import { Product } from "../entities/product.entity"

export class ResponseProductDto {
    @Expose()
    name:string

    @Expose()
    price:number

    @Expose()
    offerPrice:number

    @Expose()
    shortDescription:string

    @Expose()
    longDescription:string

    @Expose()
    quantity:number

    @Expose()
    slug:string

    @Expose()
    categoryId:number;
    @Expose()
    @Transform(({obj} : {obj : Product})=>obj?.category?.name)
    category:string

    // @Transform((value)=>console.log(value))
    // category:string

}
