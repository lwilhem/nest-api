import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('user/:id/cart')
  async getCart(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getFullCart(id);
  }
}
