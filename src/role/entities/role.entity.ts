import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryColumn()
    name: string;

    
    @Column()
    description: string;

    @OneToMany(()=>User , (user) =>user.role )
    users : User[];
}
