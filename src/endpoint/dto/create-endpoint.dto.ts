import { IsIn, IsNotEmpty } from "class-validator"
import { HttpMethod } from "../entities/endpoint.entity"

const httpMethods = ['GET','POST','PUT','DELETE']

export class CreateEndpointDto {
    @IsNotEmpty()
    url:string

    @IsNotEmpty()
    @IsIn(httpMethods)
    method:HttpMethod
}
