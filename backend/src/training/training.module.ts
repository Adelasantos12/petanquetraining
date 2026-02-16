import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { TrainingBlock } from '../entities/training-block.entity';
import { Exercise } from '../entities/exercise.entity';
import { PlayerBlock } from '../entities/player-block.entity';
import { PlayerExerciseRun } from '../entities/player-exercise-run.entity';
import { User } from '../entities/user.entity';
import { OnboardingModule } from '../onboarding/onboarding.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrainingBlock,
      Exercise,
      PlayerBlock,
      PlayerExerciseRun,
      User,
    ]),
    OnboardingModule,
  ],
  providers: [TrainingService],
  controllers: [TrainingController],
})
export class TrainingModule {}
