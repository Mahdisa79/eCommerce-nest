import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { CartModule } from 'src/cart/cart.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ShippingAddressModule } from 'src/shipping-address/shipping-address.module';
import { ShippingRuleModule } from 'src/shipping-rule/shipping-rule.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports:[TypeOrmModule.forFeature([Order,OrderDetail]),CartModule,JwtModule,ConfigModule,ShippingAddressModule,ShippingRuleModule,EmailModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
