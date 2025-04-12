import { AfterInsert, AfterUpdate, BeforeInsert, Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import slugify from "slugify";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    description:string

    @Column()
    slug:string

    // @Column({default:true})
    // isActive:boolean
    
    @ManyToOne(()=>Category,(c)=>c.children)
    parent:Category;

    @OneToMany(()=>Category,(c)=>c.parent)
    children : Category[]

    @DeleteDateColumn()
    deletedDate:Date;

    @BeforeInsert()
    @AfterUpdate()
    generateSlug(){
        const date = new Date();
        this.slug = `${slugify(this.name)}-${date.getTime()}`
    }
}
