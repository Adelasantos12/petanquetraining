import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Stripe from 'stripe';
import { Payment } from '../entities/payment.entity';
import { OnboardingService } from '../onboarding/onboarding.service';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private configService: ConfigService,
    private onboardingService: OnboardingService,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY', 'sk_test_placeholder'), {
      apiVersion: '2025-01-27' as any,
    });
  }

  // --- Stripe ---

  async createCheckoutSession(userId: string, email: string) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card', 'twint'], // Added twint
      line_items: [
        {
          price_data: {
            currency: 'chf',
            product_data: {
              name: 'Inscripción al programa (incluye diagnóstico inicial)',
            },
            unit_amount: 5000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${this.configService.get('FRONTEND_URL')}/onboarding/schedule?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.configService.get('FRONTEND_URL')}/onboarding/payment`,
      customer_email: email,
      metadata: { userId },
    });

    return { url: session.url };
  }

  async handleStripeWebhook(signature: string, payload: Buffer) {
    const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET', '');
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err) {
      this.logger.error(`Webhook signature verification failed: ${err.message}`);
      throw new Error(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;

      if (userId) {
        await this.onboardingService.completePayment(userId);

        const payment = this.paymentRepository.create({
          userId,
          externalId: session.id,
          amount: session.amount_total ? session.amount_total / 100 : 0,
          status: 'completed',
          type: 'enrollment',
          provider: 'stripe',
        });
        await this.paymentRepository.save(payment);
      }
    }

    return { received: true };
  }

  // --- PayPal ---

  async handlePayPalWebhook(payload: any) {
    const eventType = payload.event_type;
    this.logger.log(`PayPal Webhook received: ${eventType}`);

    if (eventType === 'BILLING.SUBSCRIPTION.ACTIVATED' || eventType === 'PAYMENT.SALE.COMPLETED') {
        const resource = payload.resource;
        const customId = resource.custom_id || (resource.metadata && resource.metadata.custom_id);

        if (customId) {
            this.logger.log(`PayPal payment/subscription confirmed for user ${customId}`);

            const payment = this.paymentRepository.create({
                userId: customId,
                externalId: resource.id,
                amount: resource.amount ? parseFloat(resource.amount.total) : 0,
                status: 'completed',
                type: 'subscription',
                provider: 'paypal',
            });
            await this.paymentRepository.save(payment);
        }
    }

    return { received: true };
  }
}
