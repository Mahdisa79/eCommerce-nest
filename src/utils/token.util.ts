import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/entities/user.entity";

export const generateToken = (user : User , jwtService: JwtService) =>{

    const payload = {
        id : user.id,
        email:user.email,
        firstName:user.firstName,
        lastName:user.lastName,
        isActive : user.isActive,
        roleName:user.role.name,
      }
  
    //   const accessToken =  await jwtService.signAsync(payload);
    //   return accessToken;

    return  jwtService.signAsync(payload);
}