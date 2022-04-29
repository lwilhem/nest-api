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
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
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
  @ApiOkResponse({ type: '200', description: 'Le panier est supprimé' })
  @ApiUnauthorizedResponse({
    type: '401',
    description: 'Utilisateur non autorisé',
  })
  @Delete('cart/product/:id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Param('howmany', ParseIntPipe) howmany: number,
  ) {
    return this.usersService.deleteFromCart(id, howmany);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: '200', description: 'Retourne le panier du client' })
  @ApiUnauthorizedResponse({
    type: '401',
    description: 'Utilisateur non autorisé',
  })
  @Delete('cart/delete/all')
  async deleteAll(@Request() req: any) {
    return this.usersService.deleteAllCart(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({
    type: '401',
    description: 'Utilisateur non autorisé',
  })
  @ApiOkResponse({ type: '200', description: 'Retourne le panier du client' })
  @Post('cart/add/:product')
  async addItemToCart(
    @Request() req: any,
    @Param('product', ParseIntPipe) product: number,
  ) {
    return this.usersService.addToCart(product, req.user);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({
    type: '401',
    description: 'Utilisateur non autorisé',
  })
  @ApiOkResponse({ type: '200', description: 'Retourne le panier du client' })
  @Get('find/id/:id')
  async findUser(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    console.log(req.user);
    return this.usersService.userById(id);
  }
}
