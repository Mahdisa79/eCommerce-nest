import { Expose } from "class-transformer"

export class ResponseShippingAddressDto {

    @Expose()
    id:number

    @Expose()
    value:string

    @Expose()
    phoneNumber:string
}
