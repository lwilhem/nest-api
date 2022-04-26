import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';

@Module({
  controllers: [ShopsController],
  providers: [ShopsService],
  imports: [DatabaseModule],
})
export class ShopsModule {}
