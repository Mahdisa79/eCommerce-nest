import { Expose } from "class-transformer";

export class ResponseVariantItemDto{
    @Expose()
    id:number;

    @Expose()
    value:string

    @Expose()
    variantId:number
}