import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/database.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
}
