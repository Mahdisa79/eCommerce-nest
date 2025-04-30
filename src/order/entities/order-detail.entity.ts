import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
export type status = 'pending'|'success'|'cancel'
@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id:number 

    @Column({type:'varchar' , length:100})
    productName:string

    @Column({type:'decimal' , precision:10 , scale:2})
    productPrice:number

    @Column({type:'int'})
    quantity:number

    @Column()
    variant:string

    @Column({type:'decimal',precision:10,scale:2})
    totalPrice:number

    // productId , orderId
    @ManyToOne(()=>Product)
    product:Product


    @ManyToOne(()=>Order , (order) => order.orderDetails )
    order:Order

}
