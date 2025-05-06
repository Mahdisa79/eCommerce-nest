import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpAuthDto } from './dto/sign-up-auth.dto';
import { SingInAuthDto } from './dto/sign-in-auth.dto';
import { API_VERSION } from 'src/cores/constants/app.constant';

@Controller(`${API_VERSION}/auth`)
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
  @HttpCode(200)
  async singIn(@Body() singInAuthDTO: SingInAuthDto) {
    const data = await this.authService.singIn(singInAuthDTO);
    return {
      message : 'sign in successfully',
      data 
    }
  }

  @Post('/refresh-token')
  @HttpCode(200)
  async refreshToken(@Body() Body: {refreshToken:string}) {
    const data = await this.authService.refreshToken(Body);
    return {
      message : 'sign in successfully',
      data 
    }
  }

}
