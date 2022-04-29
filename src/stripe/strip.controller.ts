import {
  Body,
  Controller,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import CreateChargeDto from './dto/create-charge.dto';
import { StripeService } from './stripe.service';

@Controller('charge')
@ApiTags('Stripe Integration')
@UseFilters(HttpExceptionFilter)
export class StripeController {
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
