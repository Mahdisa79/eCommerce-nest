import { Expose, Transform, Type } from "class-transformer"
import { Product } from "../entities/product.entity"
import { Variant } from "src/variants/entities/variant.entity"
import { ResponseVariantItemDto } from "src/variant-items/dto/response-variant-item.dto"

export class ResponseVariantDto {

    @Expose()
    id:number

    @Expose()
    name:string


    @Expose()
    productId:number

    @Expose()
    @Type(() => ResponseVariantItemDto)
    items:ResponseVariantItemDto[]
}

export class ResponseProductDto {
    @Expose()
    id:number
    
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
   
    @Expose()
    @Type(() => ResponseVariantDto)
    variants:ResponseVariantDto[]

}
