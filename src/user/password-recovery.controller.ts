import { Body, Controller, Post } from "@nestjs/common";
import { ForgotPasswordDto } from "./dto/forgot-pwd-user.dto";
import { PasswordRecoveryService } from "./password-recovery.service";
import { API_VERSION } from "src/cores/constants/app.constant";
import { ResetPasswordDto } from "./dto/reset-pwd-user.dto";

@Controller(`${API_VERSION}/password`)
export class PasswordRecoveryController{
  constructor(private readonly passwordRecoveryService: PasswordRecoveryService) {}

    @Post('/forgot')
    forgotPassword(@Body()  forgotPasswordDto:ForgotPasswordDto){
        return this.passwordRecoveryService.forgotPassword(forgotPasswordDto)
    }

    @Post('/reset')
    resetPassword(@Body()  resetPasswordDto:ResetPasswordDto){
        return this.passwordRecoveryService.resetPassword(resetPasswordDto)
    }
}