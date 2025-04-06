import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(Role)
    private roleRepository : Repository<Role>,
  ){}

  create(createRoleDto: CreateRoleDto) {
    const role = new Role();
    Object.assign(role,createRoleDto)
    return this.roleRepository.save(role);
  }

  async getRole(name:string) {
    const role = await this.roleRepository.findOne({where:{name}});
    if(!role) throw new NotFoundException(`No role ${name} found`);
    return role;
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
