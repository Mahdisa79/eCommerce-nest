import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id : number;
     
    @Column({type:'decimal' ,precision:6,scale:2})
    price:number;

    @Column({type:'int'})
    quantity:number;

    @Column({type:'text'})
    variant:string; //{ size : M}

    @Column({type:'decimal' ,precision:10,scale:2})
    totalPrice:number;

    
    @ManyToOne(()=>Product)
    product:Product;

    @ManyToOne(()=>Cart)
    cart:Cart;
}
