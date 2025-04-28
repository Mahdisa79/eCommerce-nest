import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ShippingRule {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar' , length:30})
    type:string

    @Column({type:'decimal' , precision:5 ,scale:2})
    cost:number

    @Column({type:'int'})
    estimateDay:number;

    @Column({default:true})
    status : boolean
}
