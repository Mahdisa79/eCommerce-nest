import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { getAllRoutes } from './utils/app.util';
import { Endpoint, HttpMethod } from './endpoint/entities/endpoint.entity';
import { Role } from './role/entities/role.entity';
import { Permission } from './permissions/entities/permission.entity';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
  .setTitle('eCommerce API')
  .setDescription('The eCommerce API description')
  .setVersion('1.0')
  .addTag('eCommerce')
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

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
    await queryRunner.query('TRUNCATE permission RESTART IDENTITY CASCADE')

   
    // ADD Routes
    for(const route of routes){
      const[method , url] = route.split(' ');
      await queryRunner.manager.createQueryBuilder().insert().into(Endpoint).values({url , method : method as HttpMethod}).execute();
  }

  const roles = await queryRunner.manager.getRepository(Role)
  .createQueryBuilder('role')
  .where('role.isActive = :isActive',{isActive:true})
  .getMany();
  // console.log(roles);

  const endpoints = await queryRunner.manager.getRepository(Endpoint)
  .createQueryBuilder('endpoint')
  .getMany();

  for( const role of roles){
    //Loop get All endpoints
    for(const endpoint of endpoints){

      await queryRunner.manager
      .createQueryBuilder()
      .insert().into(Permission)
      .values({endpointId : endpoint.id , roleName : role.name , isAllow : role.name === 'admin' ? true : false})
      .execute();

    }
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
