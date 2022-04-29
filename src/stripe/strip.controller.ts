import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import CreateChargeDto from './dto/create-charge.dto';
import { StripeService } from './stripe.service';

@Controller('charge')
export class ChargeController {
  constructor(private readonly stripeService: StripeService) {}

  @UseGuards(JwtAuthGuard)
  @Post('test')
  async createCharge(@Body() charge: CreateChargeDto, @Req() request: any) {
    await this.stripeService.charge(
      charge.amount,
      charge.paymentMethodId,
      request.user.stripeCustomerId,
    );
  }
}
