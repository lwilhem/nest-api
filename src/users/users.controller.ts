import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Actions sur les utilisateurs')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('user/:id/cart')
  async getCart(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getFullCart(id);
  }

  @Delete('user/cart/product/:id/:howmany')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Param('howmany', ParseIntPipe) howmany: number,
  ) {
    return this.usersService.deleteFromCart(id, howmany);
  }

  @Delete('user/cart/:id')
  async deleteAll(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteAllCart(id);
  }

  @Post('user/:user/cart/add/:product')
  async addItemToCart(
    @Param('user', ParseIntPipe) user: number,
    @Param('product', ParseIntPipe) product: number,
  ) {
    return this.usersService.addToCart(product, user);
  }

  @Delete('user/:id/')
  @Get('user/:id')
  async findUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.userById(id);
  }
}
