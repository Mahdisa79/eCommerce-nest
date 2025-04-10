import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEndpointDto } from './dto/create-endpoint.dto';
import { UpdateEndpointDto } from './dto/update-endpoint.dto';
import { Endpoint } from './entities/endpoint.entity';

@Injectable()
export class EndpointService {

  constructor(
    @InjectRepository(Endpoint)
    private endpointService : Repository<Endpoint>,
  ){}

  create(createEndpointDto: CreateEndpointDto) {
    const endpoint = new Endpoint();
    Object.assign(endpoint,createEndpointDto);

    return this.endpointService.save(endpoint);
  }


}
