import { Variant } from 'src/variants/entities/variant.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { User } from 'src/user/entities/user.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { UserPayload } from 'src/user/interfaces/user-payload.interface';
import { VariantsService } from 'src/variants/variants.service';
import { VariantItemsService } from 'src/variant-items/variant-items.service';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart) private cartRepository : Repository<Cart>,
    @InjectRepository(CartItem) private cartItemRepository : Repository<CartItem>,
    private productService : ProductService,
    private variantItemsService : VariantItemsService,

  ){}

  create(user : User) {
    const cart = new Cart();

    cart.user = user;

    return this.cartRepository.save(cart)

  }

  async findCart(userId:number){

    // const cart = await this.cartRepository.findOne({where:{user :{id : userId}},relations:{items:true,user:true}})
    const cart = await this.cartRepository.createQueryBuilder('cart').where('cart.userId = :userId',{userId}).getOne()

    if(!cart)
       throw new BadRequestException('No Cart For User')

    return cart;
  }

  async addItemToCart(addToCartDto : AddToCartDto , currentUser:UserPayload){

    const {quantity,variantItemId,productId} = addToCartDto;

    const product = await this.productService.findOne(productId);
    const variantItem = await this.variantItemsService.findOne(variantItemId);

    // console.log(variantItem);
    const variant = {itemId:variantItem.id,variant :variantItem.variant.name ,value : variantItem.value , price : variantItem.price };

    const totalPrice = ( product.price + parseFloat(`${variant.price}`) ) * quantity ;

    const cartItemExisting = await this.cartItemRepository.findOne({
      where:{product}
    })

    if(cartItemExisting && JSON.parse(cartItemExisting.variant).itemId === variant.itemId){

     
      cartItemExisting.totalPrice =totalPrice ;
      cartItemExisting.quantity =  quantity;
      await this.cartItemRepository.save(cartItemExisting);
      return;

    }

    const cartItem = new CartItem();
    cartItem.cart = await this.findCart(currentUser.id);
    cartItem.product = product;
    cartItem.price = product.price;
    cartItem.quantity = quantity;
    cartItem.variant = JSON.stringify(variant);
    cartItem.totalPrice = totalPrice ;

    
    await this.cartItemRepository.save(cartItem);

  }
  
}
