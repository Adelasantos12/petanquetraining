import { Controller, Post, Body, Get, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('onboarding')
@UseGuards(JwtAuthGuard)
export class OnboardingController {
  constructor(private onboardingService: OnboardingService) {}

  @Get('status')
  async getStatus(@Request() req) {
    return this.onboardingService.getProfile(req.user.id);
  }

  @Post('profile')
  async updateProfile(@Request() req, @Body() data: any) {
    return this.onboardingService.updateProfile(req.user.id, data);
  }

  @Post('commitment')
  async signCommitment(@Request() req, @Body() metadata: any) {
    return this.onboardingService.signCommitment(req.user.id, metadata);
  }

  @Post('complete-scheduling')
  async completeScheduling(@Request() req) {
    return this.onboardingService.completeScheduling(req.user.id);
  }

  @Post('debug/skip-payment')
  async skipPayment(@Request() req) {
    // Only allow skipping payment in development or test environments
    if (process.env.NODE_ENV === 'production' && process.env.ALLOW_DEBUG_SKIP !== 'true') {
      throw new ForbiddenException('Debug endpoints are disabled in production');
    }
    return this.onboardingService.completePayment(req.user.id);
  }
}
