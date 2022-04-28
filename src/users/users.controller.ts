import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { UsersService } from './users.service';
import path = require('path'); // Seems like i can't use path as an ES Module mmmm;

export const storage = {
  storage: diskStorage({
    destination: './public/uploads/avatars',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('users')
@UseFilters(HttpExceptionFilter)
@ApiTags('Actions sur les utilisateurs')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('user/:id/cart')
  async getCart(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getFullCart(id);
  }

  @Delete('user/cart/product/:id/:howmany')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Param('howmany', ParseIntPipe) howmany: number,
  ) {
    return this.usersService.deleteFromCart(id, howmany);
  }

  @Delete('user/cart/:id')
  async deleteAll(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteAllCart(id);
  }

  @Post('user/:user/cart/add/:product')
  async addItemToCart(
    @Param('user', ParseIntPipe) user: number,
    @Param('product', ParseIntPipe) product: number,
  ) {
    return this.usersService.addToCart(product, user);
  }

  @Delete('user/:id/')
  @Get('user/:id')
  async findUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.userById(id);
  }

  @Post('avatars/upload')
  @UseInterceptors(FileInterceptor('avatar', storage))
  uploadFile(@UploadedFile() file, @Request() req: any) {
    return of(file);
  }
}
