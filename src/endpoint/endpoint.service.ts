import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEndpointDto } from './dto/create-endpoint.dto';
import { UpdateEndpointDto } from './dto/update-endpoint.dto';
import { Endpoint, HttpMethod } from './entities/endpoint.entity';

@Injectable()
export class EndpointService {

  constructor(
    @InjectRepository(Endpoint)
    private endpointRepository : Repository<Endpoint>,
  ){}

  create(createEndpointDto: CreateEndpointDto) {
    const endpoint = new Endpoint();
    Object.assign(endpoint,createEndpointDto);

    return this.endpointRepository.save(endpoint);
  }

   async findOne(path:string , method : HttpMethod){

    const endpoint = await this.endpointRepository.findOne({where:{url:path , method}});
    if(!endpoint)
      throw new NotFoundException('Not Found endpoint')

    return endpoint
  }


}
