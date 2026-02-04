import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { UserRole } from '../entities/user.entity';

@Injectable()
export class GatingGuard implements CanActivate {
  constructor(private onboardingService: OnboardingService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) return false;
    if (user.role === UserRole.COACH) return true;

    const profile = await this.onboardingService.getProfile(user.id);
    if (profile.onboardingStep !== 'completed') {
      throw new ForbiddenException({
        message: 'Onboarding not completed',
        step: profile.onboardingStep,
      });
    }

    return true;
  }
}
