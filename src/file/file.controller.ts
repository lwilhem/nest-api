import {
  Controller,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
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
    },
  }),
};

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @UseGuards(JwtAuthGuard)
  @Post('avatars/upload')
  @UseInterceptors(FileInterceptor('avatar', avatarStorage))
  async uploadFile(@UploadedFile() file: any, @Request() req: any) {
    console.log(req.user);
    return of(file);
  }
}
