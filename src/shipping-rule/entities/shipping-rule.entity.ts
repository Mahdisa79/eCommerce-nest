import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type SHIPPING_RULE_TYPE = 'very fast'|'fast'|'normal';

@Entity()
export class ShippingRule {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar' , length:30})
    type:SHIPPING_RULE_TYPE

    @Column({type:'decimal' , precision:3 ,scale:2})
    cost:number

    @Column()
    estimateTime:Date;
}
