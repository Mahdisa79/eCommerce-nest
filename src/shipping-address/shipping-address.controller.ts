import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { ShippingAddressService } from './shipping-address.service';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { AuthGuard } from 'src/cores/guards/auth.guard';
import { API_VERSION } from 'src/cores/constants/app.constant';
import { CurrentUser } from 'src/cores/decorators/current-user.decorator';
import { UserPayload } from 'src/user/interfaces/user-payload.interface';
import { TransformDTO } from 'src/cores/interceptors/transform-dto.interceptor';
import { ResponseShippingAddressDto } from './dto/response-shipping.address.dto';

@Controller(`${API_VERSION}/shipping-addresses`)
@UseGuards(AuthGuard)
@TransformDTO(ResponseShippingAddressDto)
export class ShippingAddressController {
  constructor(private readonly shippingAddressService: ShippingAddressService) {}

  @Post()
  create(@Body() createShippingAddressDto: CreateShippingAddressDto , @CurrentUser() currentUser : UserPayload) {
    return this.shippingAddressService.create(createShippingAddressDto,currentUser);
  }

  @Get()
  findAll() {
    return this.shippingAddressService.findAll();
  }

  @Get('/me')
  findMyAddresses(@CurrentUser() currentUser : UserPayload) {
    return this.shippingAddressService.findMyAddresses(currentUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippingAddressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShippingAddressDto: UpdateShippingAddressDto) {
    return this.shippingAddressService.update(+id, updateShippingAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shippingAddressService.remove(+id);
  }
}
