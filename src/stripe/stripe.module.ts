import { Module } from '@nestjs/common';
import { StripeController } from './strip.controller';
import { StripeService } from './stripe.service';

@Module({
  providers: [StripeService],
  exports: [StripeService],
  controllers: [StripeController],
})
export class StripeModule {}
