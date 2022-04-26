import { Role } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ReturnUserDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @Exclude()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
