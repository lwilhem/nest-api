import { Controller, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { ProductsService } from './products.service';

@Controller('products')
@UseFilters(HttpExceptionFilter)
export class ProductsController {
  constructor(private productsService: ProductsService) {}
}
