import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart) private cartRepository : Repository<Cart>,
    @InjectRepository(CartItem) private cartItemRepository : Repository<CartItem>,

  ){}

  create(user : User) {
    const cart = new Cart();

    cart.user = user;

    return this.cartRepository.save(cart)

  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
