import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpAuthDto } from './dto/sign-up-auth.dto';
import { SingInAuthDto } from './dto/sign-in-auth.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async singUp(@Body() singUpAuthDTO: SingUpAuthDto) {
    const accessToken = await this.authService.singUp(singUpAuthDTO);

    return {
      message : 'sign up successfully',
      data : accessToken
    }
  }

  @Post('/sign-in')
  async singIn(@Body() singInAuthDTO: SingInAuthDto) {
    const accessToken = await this.authService.singIn(singInAuthDTO);
    return {
      message : 'sign in successfully',
      data : accessToken
    }
  }


}
