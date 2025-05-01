import { Expose, Transform } from "class-transformer"
import { Order } from "../entities/order.entity"

export class ResponseOrderDto {
    @Expose()
    id:number 

    @Expose()
    totalPrice:number

    @Expose()
    orderStatus:string

    @Expose()
    shippingAddress:string
    
    @Expose()
    shippingMethod:string

    @Expose()
    createdAt:string

    @Expose()
    @Transform(({obj} : {obj:Order}) => obj.user?.id)
    userId:string

}