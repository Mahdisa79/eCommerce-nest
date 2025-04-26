import { Injectable } from '@nestjs/common';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { UserPayload } from 'src/user/interfaces/user-payload.interface';
import { ShippingAddress } from './entities/shipping-address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ShippingAddressService {

  constructor(
    @InjectRepository(ShippingAddress) private addressRepository:Repository<ShippingAddress>,
    private userService : UserService
  ){}

  async create(createShippingAddressDto: CreateShippingAddressDto , currentUser : UserPayload) {
    const user = await this.userService.findOne(currentUser.id)

    const shippingAddress = new ShippingAddress();
    shippingAddress.user = user;
    shippingAddress.value = createShippingAddressDto.value;
    shippingAddress.phoneNumber = createShippingAddressDto.phoneNumber;

    return this.addressRepository.save(shippingAddress);
  }

  findAll() {
    return `This action returns all shippingAddress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shippingAddress`;
  }

  update(id: number, updateShippingAddressDto: UpdateShippingAddressDto) {
    return `This action updates a #${id} shippingAddress`;
  }

  remove(id: number) {
    return `This action removes a #${id} shippingAddress`;
  }
}
