import { Test, TestingModule } from '@nestjs/testing';
import { TrainingService } from './training.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { TrainingBlock } from '../entities/training-block.entity';
import { Exercise } from '../entities/exercise.entity';
import { PlayerBlock } from '../entities/player-block.entity';
import { PlayerExerciseRun } from '../entities/player-exercise-run.entity';

describe('TrainingService', () => {
  let service: TrainingService;

  const mockRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainingService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
        { provide: getRepositoryToken(TrainingBlock), useValue: mockRepository },
        { provide: getRepositoryToken(Exercise), useValue: mockRepository },
        { provide: getRepositoryToken(PlayerBlock), useValue: mockRepository },
        { provide: getRepositoryToken(PlayerExerciseRun), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<TrainingService>(TrainingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
