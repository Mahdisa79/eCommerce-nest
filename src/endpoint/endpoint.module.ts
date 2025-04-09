import { Module } from '@nestjs/common';
import { EndpointService } from './endpoint.service';
import { EndpointController } from './endpoint.controller';
import { Endpoint } from './entities/endpoint.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Endpoint])],
  controllers: [EndpointController],
  providers: [EndpointService],
})
export class EndpointModule {}
