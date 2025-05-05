import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { AllowPermissionDto } from './dto/allow-permission.dto';
import { API_VERSION } from 'src/cores/constants/app.constant';
import { AuthGuard } from 'src/cores/guards/auth.guard';

@Controller(`${API_VERSION}/permissions`)
@UseGuards(AuthGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}


  @Post()
  allow(@Body() requestBody : AllowPermissionDto){

    return this.permissionsService.allow(requestBody);
  }
  
}
