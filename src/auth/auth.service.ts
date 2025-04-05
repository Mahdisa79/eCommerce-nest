import { Injectable } from '@nestjs/common';
import { SingInAuthDto } from './dto/sign-in-auth.dto';
import { SingUpAuthDto } from './dto/sign-up-auth.dto';

@Injectable()
export class AuthService {
  create(createAuthDto: SingUpAuthDto) {
    return 'This action adds a new auth';
  }


}
