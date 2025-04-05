import { BadRequestException, Injectable } from '@nestjs/common';
import { SingInAuthDto } from './dto/sign-in-auth.dto';
import { SingUpAuthDto } from './dto/sign-up-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

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

  async singIn(singInAuthDto : SingInAuthDto){

    // 1) Find user by users email
    const user = await this.userService.findByEmail(singInAuthDto.email);
    if(!user) throw new BadRequestException('Bad Credentials');
    // 2) Compare password
    const isMatch = await bcrypt.compare(singInAuthDto.password , user.password);
    if(!isMatch) throw new BadRequestException('Bad Credentials');

    // 3) Issue accessToken
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
