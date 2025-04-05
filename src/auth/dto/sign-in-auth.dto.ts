import { PartialType } from '@nestjs/mapped-types';
import { SingUpAuthDto } from './sign-up-auth.dto';

export class SingInAuthDto extends PartialType(SingUpAuthDto) {}
