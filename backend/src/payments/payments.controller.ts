import { Controller, Post, Body, UseGuards, Request, Headers } from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('stripe/create-session')
  async createStripeSession(@Request() req: any) {
    return this.paymentsService.createCheckoutSession(req.user.id, req.user.email);
  }

  @Post('stripe/webhook')
  async stripeWebhook(
    @Headers('stripe-signature') signature: string,
    @Request() req: RawBodyRequest<ExpressRequest>,
  ) {
    return this.paymentsService.handleStripeWebhook(signature, req.rawBody as Buffer);
  }

  @Post('paypal/webhook')
  async paypalWebhook(@Body() payload: any) {
    return this.paymentsService.handlePayPalWebhook(payload);
  }
}
