import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ShippingAddress {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'text'})
    value:string

    @Column({type:'varchar' , length:12})
    phoneNumber:string

    @ManyToOne(()=>User , user => user.shippingAddresses )
    user:User
}
