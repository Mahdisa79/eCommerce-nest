import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { API_VERSION } from 'src/cores/constants/app.constant';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UserPayload } from 'src/user/interfaces/user-payload.interface';
import { AuthGuard } from 'src/cores/guards/auth.guard';
import { CurrentUser } from 'src/cores/decorators/current-user.decorator';
import { TransformDTO } from 'src/cores/interceptors/transform-dto.interceptor';
import { ResponseCartDto } from './dto/response-cart.dto';

@Controller(`${API_VERSION}/carts`)
@UseGuards(AuthGuard)
@TransformDTO(ResponseCartDto)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/add-to-cart')
  addToCart(@Body() addToCartDto : AddToCartDto , @CurrentUser() user:UserPayload ){

    return this.cartService.addItemToCart(addToCartDto , user)
  }

  @Delete('/item/:cartItemId')
  deleteItemFromCart(@Param('cartItemId',ParseIntPipe) cartItemId: number){

    return this.cartService.removeItemFromCart(cartItemId)
  }

}
