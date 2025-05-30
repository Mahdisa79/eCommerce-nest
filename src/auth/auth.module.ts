import { UserModule } from './../user/user.module';
import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from 'src/cores/guards/auth.guard';

@Global()
@Module({
  imports:[
    UserModule,

    // JwtModule.register({
    //   global: true,
    //   secret: 'jwt-secret',
    //   signOptions: { expiresIn: '60s' },
    // }),

    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          global:true,
          secret: config.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            // expiresIn: config.get<string | number>('JWT_EXPIRATION_TIME'),
            expiresIn: '10s',

          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService , AuthGuard],
  exports:[AuthService,AuthGuard , JwtModule]
})
export class AuthModule {}
