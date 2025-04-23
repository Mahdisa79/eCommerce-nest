import { Expose, Transform } from "class-transformer";
import { Role } from "src/role/entities/role.entity";
import { User } from "../entities/user.entity";

export class ResponseUserDto{

    @Expose()
    id: number;


    @Expose()
    firstName: string;

    @Expose()
    lastName: string;
  
    @Expose()
    email: string;

    @Expose()
    @Transform(({obj} : {obj : User}) => obj.role.name)
    role:string;

}