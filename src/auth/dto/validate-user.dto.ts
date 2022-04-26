import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ValidateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
