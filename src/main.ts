import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { getAllRoutes } from './utils/app.util';
import { Endpoint, HttpMethod } from './endpoint/entities/endpoint.entity';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);


  const server = app.getHttpServer();
  const router = server._events.request._router;
  const {routes} = getAllRoutes(router);

  //console.log(routes);
  const dataSource = app.get(DataSource);
  const queryRunner = dataSource.createQueryRunner();

  try{
    //DELETE ALL ENDPOINTS (truncate)
  
    await queryRunner.connect();
    await queryRunner.startTransaction()

    await queryRunner.query('TRUNCATE endpoint RESTART IDENTITY CASCADE')
   
    for(const route of routes){
      const[method , url] = route.split(' ');
      await queryRunner.manager.createQueryBuilder().insert().into(Endpoint).values({url , method : method as HttpMethod}).execute();
  }
  await queryRunner.commitTransaction();
  console.log('Insert All Routes');
}

  catch(error){
    await queryRunner.rollbackTransaction();
    console.log('Failed to truncate table' ,error );
  }finally{
    await queryRunner.release();
  }


  // GET ALL CURENT ENDPOINTS

  //INSERT TP DATABASE
}
bootstrap();
