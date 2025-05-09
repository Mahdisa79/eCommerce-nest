import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordDto{
    @IsNotEmpty()
    @IsString()
    id:string;

    @IsNotEmpty()
    @IsString()
    newPassword:string;

    @IsNotEmpty()
    @IsString()
    confirmPassword:string;

}
