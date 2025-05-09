
import { Order } from 'src/order/entities/order.entity';
import { Review } from 'src/review/entities/review.entity';
import { Role } from 'src/role/entities/role.entity';
import { ShippingAddress } from 'src/shipping-address/entities/shipping-address.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, DeleteDateColumn, OneToMany, OneToOne, CreateDateColumn, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PasswordChangeRequest {
  @PrimaryColumn()
  id: string;


  @CreateDateColumn()
  currentTime:Date;

  @ManyToOne(()=>User)
  user:User
}
