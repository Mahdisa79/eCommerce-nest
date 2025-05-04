import {
    CallHandler,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
import { EndpointService } from 'src/endpoint/endpoint.service';
import { PermissionsService } from 'src/permissions/permissions.service';
  
  @Injectable()
  export class RoleInterceptor implements NestInterceptor {
    constructor(
        private endpointService : EndpointService,
        private permissionsService : PermissionsService,

    ){

    }
    async intercept(context: ExecutionContext, next: CallHandler) {
      console.log('Authorization Interceptor');
  
      const request = context.switchToHttp().getRequest();
   
      const {route:{path}, method ,currentUser} = request

    //   console.log(path);
    //   console.log(method);
    //   console.log(request.currentUser);
    
    
    if(!currentUser)
      return next.handle();

    
    const endpoint = await this.endpointService.findOne(path,method);
    const permission = await this.permissionsService.findOne(currentUser.roleName,endpoint.id);
  
    console.log(endpoint);
    console.log(permission);

    if(!permission.isAllow)
        throw new ForbiddenException('you cannot do this action')
        return next.handle();
    }
  }