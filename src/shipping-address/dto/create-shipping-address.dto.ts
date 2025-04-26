import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"

export class CreateShippingAddressDto {
    @IsNotEmpty()
    @IsString()
    value:string

    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber:string
}
