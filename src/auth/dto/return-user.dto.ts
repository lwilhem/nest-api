import { Role } from '@prisma/client';

export class ReturnUserDto {
  id: number;

  email: string;

  username: string;

  password: string;

  avatar?: string;

  role: Role;
}
