import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
export type status = 'pending'|'success'|'cancel'
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'decimal',precision:10,scale:2})
    totalPrice:number

    @Column()
    orderStatus:status

    @Column({type:'text'})
    shippingAddress:string

    @Column({type:'text'})
    shippingMethod:string

    @ManyToOne(()=>User,(user) => user.orders )
    users:User
}
