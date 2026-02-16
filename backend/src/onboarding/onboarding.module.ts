import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnboardingService } from './onboarding.service';
import { OnboardingController } from './onboarding.controller';
import { PlayerProfile } from '../entities/player-profile.entity';
import { Commitment } from '../entities/commitment.entity';
import { User } from '../entities/user.entity';
import { GatingGuard } from './gating.guard';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlayerProfile, Commitment, User]),
    UsersModule,
  ],
  providers: [OnboardingService, GatingGuard],
  controllers: [OnboardingController],
  exports: [OnboardingService, GatingGuard],
})
export class OnboardingModule {}
