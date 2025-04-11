import { Body, Controller, Post } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { AllowPermissionDto } from './dto/allow-permission.dto';
import { API_VERSION } from 'src/cores/constants/app.constant';

@Controller(`${API_VERSION}/permissions`)

export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}


  @Post()
  allow(@Body() requestBody : AllowPermissionDto){

    return this.permissionsService.allow(requestBody);
  }
  
}
