import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "./order-detail.entity";
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

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(()=>User,(user) => user.orders )
    users:User



    @OneToMany(()=>OrderDetail , (detail) => detail.order)
    orderDetails : OrderDetail[]
}
