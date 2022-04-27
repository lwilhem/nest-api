import { Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ReturnUserDto {
  id: number;

  email: string;

  username: string;

  @Exclude()
  password: string;

  avatar?: Buffer;

  role: Role;

  constructor(partial: Partial<ReturnUserDto>) {
    Object.assign(this, partial);
  }
}
