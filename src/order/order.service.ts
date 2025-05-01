import { BadRequestException, Injectable, ParseFloatPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
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
    private dataSource : DataSource,

  ){}

  async process(currentUser:UserPayload , processOrderDto : ProcessOrderDto) {

    const queryRunner = this.dataSource.createQueryRunner();

    try{

      await queryRunner.connect();
      await queryRunner.startTransaction();
  
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
      
      // const newOrder = await this.orderRepository.save(order);
      const newOrder = await queryRunner.manager.save(order);

  
      for(const cartItem of cart.items){
        const newOrderDetails = new OrderDetail;
        newOrderDetails.order = newOrder;
        newOrderDetails.product = cartItem.product;
        newOrderDetails.productName = cartItem.product.name;
        newOrderDetails.productPrice = cartItem.product.price;
        newOrderDetails.quantity = cartItem.quantity;
        newOrderDetails.variant = cartItem.variant;
        newOrderDetails.totalPrice = cartItem.totalPrice;
  
        // await this.orderDetailRepository.save(newOrderDetails)
        await queryRunner.manager.save(newOrderDetails);

      }     
      //calc total price of order

      // const updateOrder = await this.orderRepository.findOne({where:{id:newOrder.id},relations:{orderDetails:true}})
      const updateOrder = await queryRunner.manager.findOne(Order,{where:{id:newOrder.id},relations:{orderDetails:true}})
     
      const totalOrderPrice = updateOrder?.orderDetails?.reduce((acc,curr)=>acc+parseFloat(`${curr.totalPrice}`),0)
      updateOrder.totalPrice = totalOrderPrice;
      // await this.orderRepository.save(updateOrder)
      await queryRunner.manager.save(updateOrder);
  
      //remove cart items
      await this.cartService.clearAllMyItems(currentUser)

      await queryRunner.commitTransaction()
      

    }catch(error){
      console.log('check error',error);
      
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Something not expected');
    }finally{
      await queryRunner.release();

    }


    
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
