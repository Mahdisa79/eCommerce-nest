import { generateRefreshToken } from './../utils/token.util';
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

    const accessToken =  generateToken(user,this.jwtService)
    const refreshToken =  generateRefreshToken(user,this.jwtService)

    return {accessToken,refreshToken}
  
  }

  async singIn(singInAuthDto : SingInAuthDto){

    // 1) Find user by users email
    const user = await this.userService.findByEmail(singInAuthDto.email);
    if(!user) throw new BadRequestException('Bad Credentials');
    // 2) Compare password
    const isMatch = await bcrypt.compare(singInAuthDto.password , user.password);
    if(!isMatch) throw new BadRequestException('Bad Credentials');

    // 3) Issue accessToken
    const accessToken =  await generateToken(user,this.jwtService)
    const refreshToken =  await generateRefreshToken(user,this.jwtService)

    return {accessToken,refreshToken}

  }

  async refreshToken({refreshToken}: {refreshToken:string}){

    try{

      const payload = await this.jwtService.verifyAsync(refreshToken,{
        secret:process.env.REFRESH_SECRET_KEY,
      })
  
      // console.log(payload);
      const user = await this.userService.findByEmail(payload.email);
  
      // Generate new accessToken , refreshToken
      const newAccessToken =  await generateToken(user,this.jwtService)
      const newRefreshToken =  await generateRefreshToken(user,this.jwtService)
  
      return {accessToken: newAccessToken,refreshToken:newRefreshToken}

    }catch{
      throw new BadRequestException('RT already expired')
    }
    
  }

}
