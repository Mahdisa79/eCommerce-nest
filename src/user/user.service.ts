import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository : Repository<User>,
    private roleService : RoleService,
  ){}

  async create(createUserDto: CreateUserDto) {
   
    const role = await this.roleService.getRole('user');

    const user = new User();
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    Object.assign(user,{...createUserDto , password :hashedPassword , role });

    return this.userRepository.save(user);
  }

  async findByEmail(email:string){
   
    const user = await this.userRepository.findOne({
      where:{
        email
      }
    })

    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
