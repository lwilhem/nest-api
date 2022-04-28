import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  StreamableFile,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { diskStorage } from 'multer';
import { of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Roles } from '../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { FileService } from './file.service';
import path = require('path');

export const avatarStorage = {
  storage: diskStorage({
    destination: './public/uploads/avatars',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
      console.log(req);
    },
  }),
};

export const shopStorage = {
  storage: diskStorage({
    destination: './public/uploads/shops',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
      console.log(req);
    },
  }),
};

@Controller('file')
@UseFilters(HttpExceptionFilter)
@ApiTags('Uploads de Fichiers')
export class FileController {
  constructor(private fileService: FileService) {}

  @UseGuards(JwtAuthGuard)
  @Post('avatars/upload')
  @UseInterceptors(FileInterceptor('avatar', avatarStorage))
  async uploadAvatar(@UploadedFile() file: any, @Request() req: any) {
    console.log(req.user);
    return this.fileService.avatarHandler(file, req.user);
  }

  @Roles(Role.RETAILER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('shops/upload')
  @UseInterceptors(FileInterceptor('shop_picture', avatarStorage))
  async uploadShop(@UploadedFile() file: any, @Request() req: any) {
    console.log(req.user);
    return of(file);
  }

  @Roles(Role.RETAILER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('product_picture', avatarStorage))
  @Post('products/uploads')
  async uploadProducts(@UploadedFile() file: any, @Request() req: any) {
    console.log(req.user);
    return of(file);
  }

  @UseGuards(JwtAuthGuard)
  @Get('avatar/get')
  async getFile(
    @Response({ passthrough: true }) res: any,
    @Request() req: any,
  ): Promise<StreamableFile> {
    console.log(req.user);
    return this.fileService.findFile(req.user, res);
  }
}
