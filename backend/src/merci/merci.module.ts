import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MerciService } from './merci.service';
import { MerciController } from './merci.controller';
import { MerciAssessment } from '../entities/merci-assessment.entity';
import { OnboardingModule } from '../onboarding/onboarding.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MerciAssessment]),
    OnboardingModule,
  ],
  providers: [MerciService],
  controllers: [MerciController],
})
export class MerciModule {}
