
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UseInterceptors } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function TransformDTO<T>(dto : ClassConstructor<T>){
    return UseInterceptors(new TransformInterceptor(dto))
}
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  
    constructor(private readonly dtoClass : ClassConstructor<T>){}


    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    return next
      .handle()
      .pipe(
        map((data) =>{

         
          if(data && data.data){ // have pagination
            // console.log(data);
            
            return {
              message :'success',
              data : plainToInstance(this.dtoClass,data.data,{excludeExtraneousValues:true}),
              pagination:{
                itemsPerPage: data.meta.itemsPerPage,
                totalItems: data.meta.totalItems,
                currentPage: data.meta.currentPage,
                totalPages: data.meta.totalPages,
              }
            }
          }


          return {
              message :'success',
              data : plainToInstance(this.dtoClass,data,{excludeExtraneousValues:true})
            }
        } ) ,
      );
  }
}
