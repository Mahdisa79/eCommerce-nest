import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpAuthDto } from './dto/sign-up-auth.dto';
import { SingInAuthDto } from './dto/sign-in-auth.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  singUp(@Body() createAuthDto: SingUpAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post()
  singIn(@Body() createAuthDto: SingInAuthDto) {
    return this.authService.create(createAuthDto);
  }


}
