import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ShopsService } from './shops.service';

@Controller('shops')
@UseFilters(HttpExceptionFilter)
@ApiTags('Actions sur les boutiques')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post('create')
  async create(@Body() createShopDto: CreateShopDto) {
    return this.shopsService.create(createShopDto);
  }

  @Get('findall')
  async findAll() {
    return this.shopsService.findAll();
  }

  @Get('find/id/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shopsService.findOne(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShopDto: UpdateShopDto,
  ) {
    return this.shopsService.update(id, updateShopDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.shopsService.remove(id);
  }

  @Get('/find/:id/products')
  async findMany(@Param('id', ParseIntPipe) id: number) {
    return this.shopsService.findShopProducts(id);
  }
}
