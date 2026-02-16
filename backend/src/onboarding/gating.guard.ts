import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { UserRole, UserStatus } from '../entities/user.entity';

@Injectable()
export class GatingGuard implements CanActivate {
  constructor(private onboardingService: OnboardingService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) return false;
    if (user.role === UserRole.COACH) return true;

    // ACTIVE_MEMBER is the only state allowed to access training/active features
    if (user.status !== UserStatus.ACTIVE_MEMBER) {
      throw new ForbiddenException({
        message: 'Access restricted: Active membership required',
        status: user.status,
      });
    }

    return true;
  }
}
