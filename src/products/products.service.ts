import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto, req: any) {
    const shop = await this.prisma.shop.findUnique({
      where: { retailerId: req.id },
    });
    const find = await this.prisma.product.findUnique({
      where: { name: createProductDto.name },
    });
    if (find) throw new BadRequestException('Ce nom est déjà pris');

    return await this.prisma.product.create({
      data: { ...createProductDto, shopId: shop.id },
    });
  }

  async filterByPrice(min: number, max: number) {
    return await this.prisma.product.findMany({
      where: { price: { lt: max, gt: min } },
    });
  }

  async findAllProduct() {
    return this.prisma.product.findMany();
  }

  async findProductById(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException(`Ce produit n'existe pas`);

    return product;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException(`Ce produit n'existe pas`);

    return this.prisma.product.update({
      where: { id: product.id },
      data: { ...updateProductDto },
    });
  }

  async deleteProduct(id: number, req: any) {
    const shop = await this.prisma.shop.findUnique({
      where: { retailerId: req.id },
    });
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException(`Ce produit n'existe pas`);

    if (product.shopId != shop.id) throw new UnauthorizedException();

    return this.prisma.product.delete({ where: { id: product.id } });
  }
}
