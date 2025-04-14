import slugify from "slugify";
import { Category } from "src/category/entities/category.entity";
import { AfterUpdate, BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name:string

    @Column()
    price:number


    @Column({nullable:true})
    offerPrice:number

    @Column()
    shortDescription:string

    
    @Column({nullable:true})
    longDescription:string

    @Column()
    quantity:number

    @Column()
    slug:string

    @ManyToOne(()=>Category, (c)=>c.products)
    category:Category;


    @BeforeInsert()
    @AfterUpdate()
    generateSlug(){
        const date = new Date();
        this.slug = `${slugify(this.name)}-${date.getTime()}`
    }
}
