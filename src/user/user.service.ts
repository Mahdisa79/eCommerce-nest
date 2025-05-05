import { ChangePwdUserDto } from './dto/change-pwd-user.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleService } from 'src/role/role.service';
import { UserPayload } from './interfaces/user-payload.interface';
import { SALT } from 'src/cores/constants/app.constant';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository : Repository<User>,
    private roleService : RoleService,
    private cartService : CartService
  ){}

  async create(createUserDto: CreateUserDto) {
   
    
    const role = await this.roleService.getRole('user');

    const user = new User();
    const hashedPassword = await bcrypt.hash(createUserDto.password, SALT);
    Object.assign(user,{...createUserDto , password :hashedPassword , role });

    

    const userSaved = await this.userRepository.save(user);

    await this.cartService.create(userSaved);

    return userSaved;
  }

  async findByEmail(email:string){
   
    const user = await this.userRepository.findOne({
      where:{
        email
      },
      relations:{role:true}
    })

    return user;
  }

  async findAll() {
    const users = await this.userRepository.find({relations:{role:true}});
    // console.log(users);
    
    return users;
  }

  async findOne(id: number) {
    const users = await this.userRepository.findOne({where:{id},relations:{role:true , orders:{orderDetails:{product:true}}}});
  
    if(!users)throw new NotFoundException(`User ${id} Not Found `);

    return users;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const user = await this.findOne(id);

    // Object.assign(user,{
    //   firstName : updateUserDto.firstName,
    //   lastName : updateUserDto.lastName
    // })

    user.firstName = updateUserDto.firstName ? updateUserDto.firstName : user.firstName;
    user.lastName = updateUserDto.lastName? updateUserDto.lastName : user.lastName;

    return this.userRepository.save(user);

  }

  async updateMe(currentUser : UserPayload, updateUserDto: UpdateUserDto) {

    console.log('hiiii');
    
    const user = await this.findOne(currentUser.id);

    user.firstName = updateUserDto.firstName ? updateUserDto.firstName : user.firstName;
    user.lastName = updateUserDto.lastName? updateUserDto.lastName : user.lastName;

    return this.userRepository.save(user);

  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.softRemove(user)
  }



  async changeMyPassword(changePwdUserDto:ChangePwdUserDto ,currentUser : UserPayload  ) {

    const user = await this.findOne(currentUser.id)
    const {currentPassword ,newPassword ,confirmPassword } =changePwdUserDto;

    const isMatch = await bcrypt.compare(currentPassword , user.password)

    if(!isMatch)
      throw new BadRequestException('wrong password')

    if(newPassword !== confirmPassword)
      throw new BadRequestException('Passwords Are Not Same')

    const hashedNewPassword = await bcrypt.hash(newPassword,SALT);

    user.password = hashedNewPassword;

    await this.userRepository.save(user)

  }

}
