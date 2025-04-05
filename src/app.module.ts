import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'test',
    database: 'eCommerce_nestjs',
    entities: [],
    synchronize: true,
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
