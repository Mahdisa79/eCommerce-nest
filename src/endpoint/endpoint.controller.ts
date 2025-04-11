import { Controller, Get, Request } from '@nestjs/common';
import { Request as ExpressRequest, Router } from 'express';
import { getAllRoutes } from 'src/utils/app.util';
import { EndpointService } from './endpoint.service';
import { API_VERSION } from 'src/cores/constants/app.constant';

@Controller(`${API_VERSION}/endpoints`)
export class EndpointController {
  constructor(private readonly endpointService: EndpointService) {}


  @Get('/all')
  root(@Request() req :ExpressRequest ) {
    const router = req.app._router as Router;
    return getAllRoutes(router);
  }


 
}
