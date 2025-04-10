import { Permission } from "src/permissions/entities/permission.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

 
export type HttpMethod = 'GET'|'POST'|'PATCH'|'DELETE' ;

@Entity()
export class Endpoint {
    @PrimaryGeneratedColumn()
    id : number ;


    @Column()
    url:string

    @Column()
    method:HttpMethod;

    @OneToMany(()=>Permission , (prem) =>prem.role )
    permissions : Permission[];
}
