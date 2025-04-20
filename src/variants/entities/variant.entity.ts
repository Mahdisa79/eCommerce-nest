import { Product } from "src/product/entities/product.entity";
import { VariantItem } from "src/variant-items/entities/variant-item.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Variant {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar' , length:20})
    name:string

    @ManyToOne(()=>Product , (p)=>p.variants )
    product:Product

    @OneToMany(()=>VariantItem, (item) => item.variant)
    items:VariantItem[]
}
