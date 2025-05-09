import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PasswordChangeRequest } from "./entities/password-change-request";
import { Repository } from "typeorm";
import { ForgotPasswordDto } from "./dto/forgot-pwd-user.dto";
import { UserService } from "./user.service";
import{v4 as uuidv4} from 'uuid';
import * as crypto from 'node:crypto';
import { EmailService } from "src/email/email.service";
import { ResetPasswordDto } from "./dto/reset-pwd-user.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from 'bcrypt'
import { SALT } from "src/cores/constants/app.constant";

@Injectable()
export class PasswordRecoveryService{

    constructor(
        @InjectRepository(PasswordChangeRequest)
        private passwordChangeRequestRepository : Repository<PasswordChangeRequest>,

        @InjectRepository(User)
        private userRepository : Repository<User>,

        private userService : UserService,
        private emailService : EmailService,


    ){}

    async forgotPassword(forgotPasswordDto:ForgotPasswordDto){

        const user = await this.userService.findByEmail(forgotPasswordDto.email)
        if(!user)
            throw new BadRequestException('user Not Found')




        //prevent user to sent many change password request
        const changePasswordUser = await this.passwordChangeRequestRepository.findOne({
            where:{
                user:user
            }
        })
        if(changePasswordUser){

            // expire in 10 min
            //1000 * 60 * 10
            if( new Date().getTime() - new  Date(changePasswordUser.currentTime).getTime() > 1000 * 60 * 10){
                await this.passwordChangeRequestRepository.remove(changePasswordUser)
            }
            else{
                throw new BadRequestException('you already sent forgot password before . please try to reset password.')
            }

        }



        const rawId = uuidv4()
        const hashedUUID = crypto.createHash('sha256').update(rawId).digest('hex');

        const passwordChangeRequest = new PasswordChangeRequest();
        passwordChangeRequest.id =hashedUUID; 
        passwordChangeRequest.user =user; 

        await this.passwordChangeRequestRepository.save(passwordChangeRequest)

        // Send email
        await this.emailService.sendEmail({
            to:user.email ,
            subject:'forgot password' ,
            html:`<h1>Please click on this link to reset password: <a href="http://frontend.com?password-reset-id=${rawId}"> click here</a></h1>` })

    }

    async resetPassword(resetPasswordDto : ResetPasswordDto){

        const hashedUUID = crypto.createHash('sha256').update(resetPasswordDto.id).digest('hex');

        const  userChangeRequest = await this.passwordChangeRequestRepository.findOne({
            where:{id:hashedUUID},
            relations:['user']
        })

        if(!userChangeRequest)
            throw new BadRequestException('Error when reset password , please try to forgot password again')


        //expire in 10 min
        //1000 * 60 * 10
        if( new Date().getTime() - new  Date(userChangeRequest.currentTime).getTime() > 1000 * 60 * 10){
            await this.passwordChangeRequestRepository.remove(userChangeRequest)
            throw new BadRequestException('Already Expire , Please try forgot again')
        }


        if(resetPasswordDto.newPassword !== resetPasswordDto.confirmPassword)
            throw new BadRequestException('Password are not the same')


        const user = userChangeRequest.user
        user.password = await bcrypt.hash(resetPasswordDto.newPassword , SALT)
        await this.userRepository.save(user)

        //clean up password change request table
        await this.passwordChangeRequestRepository.remove(userChangeRequest)

    }

}