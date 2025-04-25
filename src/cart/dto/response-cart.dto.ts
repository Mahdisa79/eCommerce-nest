import { Expose, Type } from "class-transformer";

class CartItemDto{
    @Expose()
    id:number;
    @Expose()
    price:number;
    @Expose()
    quantity:number;
    @Expose()
    variant:string;
    @Expose()
    totalPrice:number
}

export class ResponseCartDto{
    @Expose()
    id:number


    @Expose()
    totalPrice:number;


    @Expose()
    @Type(()=>CartItemDto)
    items:CartItemDto;
}