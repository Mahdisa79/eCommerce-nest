import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CurrentUser } from 'src/cores/decorators/current-user.decorator';
import { UserPayload } from 'src/user/interfaces/user-payload.interface';
import { API_VERSION } from 'src/cores/constants/app.constant';
import { AuthGuard } from 'src/cores/guards/auth.guard';
import { TransformDTO } from 'src/cores/interceptors/transform-dto.interceptor';
import { ResponseOrderDto } from './dto/response-order.dto';
import { ProcessOrderDto } from './dto/process.order.dto';

@Controller(`${API_VERSION}/orders`)
@UseGuards(AuthGuard)
@TransformDTO(ResponseOrderDto)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  process( @Body() processOrderDto : ProcessOrderDto,@CurrentUser() user : UserPayload ) {
    return this.orderService.process(user , processOrderDto);
  }
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
