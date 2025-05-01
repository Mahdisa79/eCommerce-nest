
import { Order } from 'src/order/entities/order.entity';
import { Role } from 'src/role/entities/role.entity';
import { ShippingAddress } from 'src/shipping-address/entities/shipping-address.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, DeleteDateColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;


  @Column({ default: true })
  isActive: boolean;

  @DeleteDateColumn()
  deletedDate:Date;

  @ManyToOne(() =>Role , (role) => role.users)
  role: Role;

  @OneToMany(() => ShippingAddress,address => address.user)
  shippingAddresses:ShippingAddress[]

  @OneToMany(()=>Order , (order) => order.user)
  orders : Order[]
}
