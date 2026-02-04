import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { TrainingBlock } from '../entities/training-block.entity';
import { Exercise } from '../entities/exercise.entity';
import { PlayerBlock } from '../entities/player-block.entity';
import { PlayerExerciseRun } from '../entities/player-exercise-run.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrainingBlock,
      Exercise,
      PlayerBlock,
      PlayerExerciseRun,
    ]),
  ],
  providers: [TrainingService],
  controllers: [TrainingController],
})
export class TrainingModule {}
