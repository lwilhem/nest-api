import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/database.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Injectable()
export class ShopsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createShopDto: CreateShopDto) {
    const shop = await this.prisma.shop.findUnique({
      where: { name: createShopDto.name },
    });
    if (shop) throw new BadRequestException('Ce nom est dèjà pris');

    return this.prisma.shop.create({ data: { ...createShopDto } });
  }

  async findAll() {
    return await this.prisma.shop.findMany();
  }

  async findOne(id: number) {
    const shop = await this.prisma.shop.findUnique({
      where: { id },
    });
    if (shop) return shop;
    throw new NotFoundException('Boutique ?');
  }

  async update(id: number, updateShopDto: UpdateShopDto) {
    const shop = await this.prisma.shop.findUnique({
      where: { id },
    });
    if (!shop) throw new NotFoundException();
    return this.prisma.shop.update({
      where: { id },
      data: { ...updateShopDto },
    });
  }

  async remove(id: number) {
    const shop = await this.prisma.shop.findUnique({
      where: { id },
    });
    if (!shop) throw new NotFoundException();

    return this.prisma.shop.delete({ where: { id } });
  }

  async findShopProducts(id: number) {
    const shop = await this.prisma.shop.findUnique({ where: { id } });
    if (!shop) throw new NotFoundException();

    return this.prisma.product.findMany({ where: { shopId: shop.id } });
  }
}
