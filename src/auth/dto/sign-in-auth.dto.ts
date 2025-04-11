import { ApiProperty } from '@nestjs/swagger';

export class SingInAuthDto  {
    @ApiProperty({default:'admin@gmail.com'})
    email: string;

    @ApiProperty({default:'test1234'})
    password: string;
}
