import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
}
