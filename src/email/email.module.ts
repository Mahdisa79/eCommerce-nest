import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  imports:[
    MailerModule.forRoot({
      transport: {
        host: "sandbox.smtp.mailtrap.io",
        port: 25,
        secure:false,
        auth: {
          user: "0167b5f71abd39",
          pass: "dd2b68f3b2e9c5"
        }
      },
    }),
  ],
  controllers: [],
  providers: [EmailService],
  exports:[EmailService]
})
export class EmailModule {}
