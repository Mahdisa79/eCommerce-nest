import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { TransformDTO } from 'src/cores/interceptors/transform-dto.interceptor';
import { ResponseRoleDTO } from './dto/response-role.dto ';
import { API_VERSION } from 'src/cores/constants/app.constant';
import { AuthGuard } from 'src/cores/guards/auth.guard';

@Controller(`${API_VERSION}/roles`)

@UseGuards(AuthGuard)
@TransformDTO(ResponseRoleDTO)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.roleService.getRole(name);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(name, updateRoleDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.roleService.remove(name);
  }
}
