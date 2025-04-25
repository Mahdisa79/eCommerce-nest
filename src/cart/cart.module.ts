import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { ProductService } from 'src/product/product.service';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { VariantItemsModule } from 'src/variant-items/variant-items.module';

@Module({
  imports:[TypeOrmModule.forFeature([Cart,CartItem]),ProductModule ,JwtModule,ConfigModule , VariantItemsModule],
  controllers: [CartController],
  providers: [CartService],
  exports:[CartService]
})
export class CartModule {}
