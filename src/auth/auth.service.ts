import { Injectable } from '@nestjs/common';
import { SingInAuthDto } from './dto/sign-in-auth.dto';
import { SingUpAuthDto } from './dto/sign-up-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  
  constructor(
    private userService : UserService,
    private jwtService : JwtService
  ){}

  async singUp(createAuthDto: SingUpAuthDto) {
    //1)create user
    //2)hash password
    const user = await this.userService.create(createAuthDto)
    //3)save it to database
    //4)Generate JWT
    const payload = {
      id : user.id,
      email:user.email,
      firstName:user.firstName,
      lastName:user.lastName,
      isActive : user.isActive
    }

    const accessToken =  await this.jwtService.signAsync(payload);
    return accessToken;
  
  }


}
