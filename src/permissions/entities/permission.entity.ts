import { Endpoint } from './../../endpoint/entities/endpoint.entity';
import { Role } from "src/role/entities/role.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(()=>Role , (role) =>role.permissions )
    role : Role;

    
    @ManyToOne(()=>Role , (role) =>role.permissions )
    endpoint : Endpoint;


    isAllow:boolean;

}
