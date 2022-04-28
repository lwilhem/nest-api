import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('Actions sur les Produits')
@UseFilters(HttpExceptionFilter)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Roles(Role.RETAILER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  async create(@Body() data: CreateProductDto, @Request() req: any) {
    console.log(req.user);
    return this.productsService.createProduct(data, req.user);
  }

  @Get('findall')
  async findAll() {
    return this.productsService.findAllProduct();
  }

  @Get('product/filterby/price')
  async filter(@Body() { min, max }) {
    return this.productsService.filterByPrice(+min, +max);
  }

  @Get('find/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findProductById(id);
  }

  @Roles(Role.RETAILER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateProductDto,
    @Request() req: any,
  ) {
    console.log(req.user);
    return this.productsService.updateProduct(id, data, req.user);
  }

  @Roles(Role.RETAILER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    console.log(req.user);
    return this.productsService.deleteProduct(id, req.user);
  }
}
