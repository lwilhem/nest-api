import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../database/database.service';
import { CreateUserDto } from './dto/create-dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { ValidateUserDto } from './dto/validate-user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async registerUser(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (user) throw new BadRequestException('cette email est déjà pris');

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createUserDto.password, salt);

    return this.prisma.user.create({ data: { ...createUserDto, password } });
  }

  async validateUser(validateUserDto: ValidateUserDto): Promise<ReturnUserDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: validateUserDto.email },
    });
    if (!user) throw new NotFoundException('Utilisteur introuvable');

    const check = await bcrypt.compare(validateUserDto.password, user.password);
    if (!check) throw new BadRequestException('Mot de passe incorrect');

    return user;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
