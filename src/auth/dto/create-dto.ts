export class CreateUserDto {
  email: string;

  password: string;

  username: string;

  avatar?: string | null;

  path?: string;
}
