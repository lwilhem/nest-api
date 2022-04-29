import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { ReturnUserDto } from '../auth/dto/return-user.dto';
import { PrismaService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getFullCart(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException();

    return await this.prisma.cartItem.findMany({ where: { retailerId: id } });
  }

  async addToCart(productId: number, userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException();

    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (product.stock <= 0) throw new BadRequestException();

    const cart = await this.prisma.cartItem.findFirst({
      where: {
        buyerId: userId,
        retailerId: product.shopId,
        productId: product.id,
      },
    });
    if (cart)
      return await this.prisma.cartItem.update({
        where: { id: cart.id },
        data: { quantity: cart.quantity++ },
      });

    return this.prisma.cartItem.create({
      data: {
        buyerId: user.id,
        retailerId: product.shopId,
        productId: product.id,
      },
    });
  }

  async deleteFromCart(id: number, numberToDelete: number) {
    const cart = await this.prisma.cartItem.findFirst({ where: { id } });
    if (!cart) throw new NotFoundException();

    if (cart.quantity - numberToDelete <= 0)
      return this.prisma.cartItem.delete({ where: { id } });

    return this.prisma.cartItem.update({
      where: { id },
      data: { quantity: cart.quantity - numberToDelete },
    });
  }

  async deleteAllCart(userId: number) {
    return this.prisma.cartItem.deleteMany({ where: { buyerId: userId } });
  }

  async userById(id: number): Promise<ReturnUserDto> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async defineRole(id: number, role: Role) {
    const user = await this.prisma.user.update({
      where: { id: id },
      data: { role: role },
    });
    return user;
  }
}
