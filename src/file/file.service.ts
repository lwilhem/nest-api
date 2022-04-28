import {
  BadRequestException,
  Injectable,
  NotFoundException,
  StreamableFile,
  UnauthorizedException,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { of } from 'rxjs';
import { PrismaService } from '../database/database.service';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  async avatarHandler(file: any, req: any) {
    const user = await this.prisma.user.findUnique({ where: { id: req.id } });
    if (!user) throw new UnauthorizedException();

    try {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { avatar: file.destination, path: file.path },
      });
    } catch (e) {
      throw new BadRequestException(e);
    }

    return of(file);
  }

  async findFile(req: any, res: any) {
    const user = await this.prisma.user.findUnique({ where: { id: req.id } });
    if (!user) throw new NotFoundException();
    console.log(user);
    const file = createReadStream(join(process.cwd(), `${user.path}`));
    res.set({
      'Content-Type': 'image/png',
    });
    return new StreamableFile(file);
  }
}
