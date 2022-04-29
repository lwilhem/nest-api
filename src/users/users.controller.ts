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
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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
  @Get(':id/cart')
  @ApiOkResponse({ type: '200', description: 'Retourne le panier du client' })
  @ApiNotFoundResponse({
    type: '404',
    description: 'Le panier est inexistsant',
  })
  async getCart(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getFullCart(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('cart/product/:id/:howmany')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Param('howmany', ParseIntPipe) howmany: number,
  ) {
    return this.usersService.deleteFromCart(id, howmany);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('cart/:id')
  async deleteAll(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteAllCart(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/cart/add/:product')
  async addItemToCart(
    @Param('id', ParseIntPipe) id: number,
    @Param('product', ParseIntPipe) product: number,
  ) {
    return this.usersService.addToCart(product, id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Get('find/id/:id')
  async findUser(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    console.log(req.user);
    return this.usersService.userById(id);
  }
}
