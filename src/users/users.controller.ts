import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { UsersService } from './users.service';

@Controller('users')
@UseFilters(HttpExceptionFilter)
@ApiTags('Actions sur les utilisateurs')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('user/:id/cart')
  async getCart(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getFullCart(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('user/cart/product/:id/:howmany')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Param('howmany', ParseIntPipe) howmany: number,
  ) {
    return this.usersService.deleteFromCart(id, howmany);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('user/cart/:id')
  async deleteAll(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteAllCart(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('user/:user/cart/add/:product')
  async addItemToCart(
    @Param('user', ParseIntPipe) user: number,
    @Param('product', ParseIntPipe) product: number,
  ) {
    return this.usersService.addToCart(product, user);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async findUser(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    console.log(req.user);
    return this.usersService.userById(id);
  }
}
