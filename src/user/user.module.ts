import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from 'src/role/role.module';
import { CartModule } from 'src/cart/cart.module';
import { PasswordChangeRequest } from './entities/password-change-request';
import { PasswordRecoveryService } from './password-recovery.service';
import { PasswordRecoveryController } from './password-recovery.controller';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports:[TypeOrmModule.forFeature([User,PasswordChangeRequest]),RoleModule,JwtModule,ConfigModule,CartModule],
  controllers: [UserController,PasswordRecoveryController],
  providers: [UserService,PasswordRecoveryService],
  exports:[UserService]
})
export class UserModule {}
