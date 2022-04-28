import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
        data: { avatar: file.destination, path: file.directory },
      });
    } catch (e) {
      throw new BadRequestException(e);
    }

    return of(file);
  }
}
