import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { AuthService } from './auth.service';
import { Roles } from './decorators/role.decorator';
import { CreateUserDto } from './dto/create-dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { RolesGuard } from './guards/role.guard';

@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() user: CreateUserDto) {
    return await this.authService.registerUser(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @Roles(Role.BUYER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getProfile(@Request() req: any) {
    return req.user;
  }
}
