import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id : number;
     
    @Column()
    totalPrice:number;

    @OneToOne(()=>User)
    @JoinColumn()
    user:User
}
