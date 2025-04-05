import { BadRequestException, Injectable } from '@nestjs/common';
import { SingInAuthDto } from './dto/sign-in-auth.dto';
import { SingUpAuthDto } from './dto/sign-up-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { generateToken } from 'src/utils/token.util';

@Injectable()
export class AuthService {
  
  constructor(
    private userService : UserService,
    private jwtService : JwtService
  ){}

  async singUp(singUpAuthDto: SingUpAuthDto) {
    //1)create user
    //2)hash password
    const user = await this.userService.create(singUpAuthDto)
    //3)save it to database
    //4)Generate JWT

    return generateToken(user,this.jwtService)
  
  }

  async singIn(singInAuthDto : SingInAuthDto){

    // 1) Find user by users email
    const user = await this.userService.findByEmail(singInAuthDto.email);
    if(!user) throw new BadRequestException('Bad Credentials');
    // 2) Compare password
    const isMatch = await bcrypt.compare(singInAuthDto.password , user.password);
    if(!isMatch) throw new BadRequestException('Bad Credentials');

    // 3) Issue accessToken
    return generateToken(user,this.jwtService)

  }

}
