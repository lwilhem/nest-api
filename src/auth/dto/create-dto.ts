export class CreateUserDto {
  email: string;

  password: string;

  username: string;

  avatar?: Buffer | null;
}
