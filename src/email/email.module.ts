import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    MailerModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:(configService : ConfigService) => {
        return {
          transport: {
            host: configService.get<string>('EMAIL_HOST'),
            port: configService.get<number>('EMAIL_PORT'),
            secure:false,
            auth: {
              user: configService.get<string>('EMAIL_USER'),
              pass: configService.get<string>('EMAIL_PASSWORD')
            }
          },
        }
      },

      inject:[ConfigService],
    }),
  ],
  controllers: [],
  providers: [EmailService],
  exports:[EmailService]
})
export class EmailModule {}
