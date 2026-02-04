import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachService } from './coach.service';
import { CoachController } from './coach.controller';
import { User } from '../entities/user.entity';
import { PlayerProfile } from '../entities/player-profile.entity';
import { MerciAssessment } from '../entities/merci-assessment.entity';
import { PlayerBlock } from '../entities/player-block.entity';
import { Payment } from '../entities/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      PlayerProfile,
      MerciAssessment,
      PlayerBlock,
      Payment,
    ]),
  ],
  providers: [CoachService],
  controllers: [CoachController],
})
export class CoachModule {}
