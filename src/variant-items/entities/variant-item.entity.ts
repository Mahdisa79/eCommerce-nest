import { Variant } from 'src/variants/entities/variant.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VariantItem {

    @PrimaryGeneratedColumn()
    id : number

    @Column({type:'varchar' , length:20}) 
    value:string

    @Column({type:'decimal' , precision : 4 , scale:2}) 
    price:number
    
    @ManyToOne(()=>Variant , (v)=>v.items , {onDelete:'CASCADE'})
    variant:Variant

}
