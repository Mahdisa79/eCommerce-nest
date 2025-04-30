import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { CartService } from 'src/cart/cart.service';
import { UserPayload } from 'src/user/interfaces/user-payload.interface';
import { ProcessOrderDto } from './dto/process.order.dto';
import { ShippingAddressService } from 'src/shipping-address/shipping-address.service';
import { ShippingRuleService } from 'src/shipping-rule/shipping-rule.service';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order) private orderRepository : Repository<Order>,
    @InjectRepository(OrderDetail) private orderDetailRepository : Repository<OrderDetail>,
    private cartService : CartService,
    private shippingAddressService : ShippingAddressService,
    private shippingRuleService : ShippingRuleService,
  ){}

  async process(currentUser:UserPayload , processOrderDto : ProcessOrderDto) {
    //Shipping Address 
    const shippingAddress = await this.shippingAddressService.findOne(processOrderDto.shippingAddressId)

    if(shippingAddress.user.id !== currentUser.id)
      throw new BadRequestException('Please use another address')

    const shippingAddressInfo = {
      id : shippingAddress.id ,
      value : shippingAddress.value ,
      phoneNumber : shippingAddress.phoneNumber ,
    }
    //Shipping Rule
    const shippingRule = await this.shippingRuleService.findOne(processOrderDto.shippingRuleId);
    const cart = await this.cartService.findCart(currentUser.id);
    const order = new Order();

    order.shippingAddress =  JSON.stringify(shippingAddressInfo);
    order.shippingMethod =  JSON.stringify(shippingRule);
    
    const newOrder = await this.orderRepository.save(order);

    for(const cartItem of cart.items){
      const newOrderDetails = new OrderDetail;
      newOrderDetails.order = newOrder;
      newOrderDetails.product = cartItem.product;
      newOrderDetails.productName = cartItem.product.name;
      newOrderDetails.productPrice = cartItem.product.price;
      newOrderDetails.quantity = cartItem.quantity;
      newOrderDetails.variant = cartItem.variant;
      newOrderDetails.totalPrice = cartItem.totalPrice;

      await this.orderDetailRepository.save(newOrderDetails)
    }


    //remove cart items
    //calc total price of order

    
  }

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
