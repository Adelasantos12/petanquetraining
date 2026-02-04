import { User } from './user.entity';
import { PlayerProfile } from './player-profile.entity';
import { Commitment } from './commitment.entity';
import { Payment } from './payment.entity';
import { MerciAssessment } from './merci-assessment.entity';
import { TrainingBlock } from './training-block.entity';
import { PlayerBlock } from './player-block.entity';
import { Exercise } from './exercise.entity';
import { PlayerExerciseRun } from './player-exercise-run.entity';

export {
  User,
  PlayerProfile,
  Commitment,
  Payment,
  MerciAssessment,
  TrainingBlock,
  PlayerBlock,
  Exercise,
  PlayerExerciseRun,
};

export const ENTITIES = [
  User,
  PlayerProfile,
  Commitment,
  Payment,
  MerciAssessment,
  TrainingBlock,
  PlayerBlock,
  Exercise,
  PlayerExerciseRun,
];
