import { AfterInsert, AfterUpdate, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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

    @BeforeInsert()
    @AfterUpdate()
    generateSlug(){
        const date = new Date();
        this.slug = `${slugify(this.name)}-${date.getTime()}`
    }
}
