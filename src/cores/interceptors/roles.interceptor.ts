import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class RoleInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      console.log('Authorization Interceptor');
  
      const request = context.switchToHttp().getRequest();
   
      const {route:{path}, method} = request

      console.log(path);
      console.log(method);

      

      return next.handle();
    }
  }