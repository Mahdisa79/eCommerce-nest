import { Module } from '@nestjs/common';
import { ShippingAddressService } from './shipping-address.service';
import { ShippingAddressController } from './shipping-address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingAddress } from './entities/shipping-address.entity';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[TypeOrmModule.forFeature([ShippingAddress]),UserModule,JwtModule,ConfigModule],
  controllers: [ShippingAddressController],
  providers: [ShippingAddressService],
  exports:[ShippingAddressService]
})
export class ShippingAddressModule {}
