import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/database.service';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}
}
