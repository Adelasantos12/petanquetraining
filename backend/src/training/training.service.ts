import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserStatus } from '../entities/user.entity';
import { TrainingBlock } from '../entities/training-block.entity';
import { Exercise } from '../entities/exercise.entity';
import { PlayerBlock } from '../entities/player-block.entity';
import { PlayerExerciseRun } from '../entities/player-exercise-run.entity';
import { RecordResultDto } from './dto/record-result.dto';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(TrainingBlock)
    private blockRepository: Repository<TrainingBlock>,
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
    @InjectRepository(PlayerBlock)
    private playerBlockRepository: Repository<PlayerBlock>,
    @InjectRepository(PlayerExerciseRun)
    private runRepository: Repository<PlayerExerciseRun>,
  ) {}

  async getActiveBlock(userId: string) {
    const playerBlock = await this.playerBlockRepository.findOne({
      where: { userId, status: 'active' },
      relations: ['block', 'block.exercises'],
    });

    if (!playerBlock) return null;

    playerBlock.block.exercises.sort((a, b) => a.order - b.order);

    const runs = await this.runRepository.find({
      where: { userId, exercise: { blockId: playerBlock.blockId } },
    });

    return {
      ...playerBlock,
      runs,
    };
  }

  async recordResult(userId: string, dto: RecordResultDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user.status !== UserStatus.ACTIVE_MEMBER) {
        throw new ForbiddenException('Only active members can record results');
    }

    const activeBlock = await this.getActiveBlock(userId);
    if (!activeBlock) throw new BadRequestException('No active block for this player');

    const exercise = activeBlock.block.exercises.find(e => e.id === dto.exerciseId);
    if (!exercise) throw new BadRequestException('Exercise not found in active block');

    const allExercises = activeBlock.block.exercises;
    const currentExerciseIndex = allExercises.findIndex(e => e.id === dto.exerciseId);

    for (let i = 0; i < currentExerciseIndex; i++) {
        const prevExercise = allExercises[i];
        for (const dist of prevExercise.distances) {
            const hasRun = activeBlock.runs.some(r => r.exerciseId === prevExercise.id && r.distance === dist);
            if (!hasRun) throw new BadRequestException(`Must complete exercise ${prevExercise.name} at ${dist}m first`);
        }
    }

    const currentDistanceIndex = exercise.distances.indexOf(dto.distance);
    if (currentDistanceIndex === -1) throw new BadRequestException('Invalid distance for this exercise');

    for (let i = 0; i < currentDistanceIndex; i++) {
        const prevDist = exercise.distances[i];
        const hasRun = activeBlock.runs.some(r => r.exerciseId === exercise.id && r.distance === prevDist);
        if (!hasRun) throw new BadRequestException(`Must complete this exercise at ${prevDist}m first`);
    }

    const total = dto.balls.reduce((acc, val) => acc + val, 0);
    const percentage = (total / 6) * 100;

    const run = this.runRepository.create({
      userId,
      exerciseId: dto.exerciseId,
      distance: dto.distance,
      balls: dto.balls,
      total,
      percentage,
    });

    await this.runRepository.save(run);

    await this.checkBlockCompletion(userId, activeBlock.id);

    return run;
  }

  private async checkBlockCompletion(userId: string, playerBlockId: string) {
    const playerBlock = await this.playerBlockRepository.findOne({
        where: { id: playerBlockId },
        relations: ['block', 'block.exercises']
    });

    if (!playerBlock) return;

    const runs = await this.runRepository.find({
        where: { userId, exercise: { blockId: playerBlock.blockId } }
    });

    let completed = true;
    for (const exercise of playerBlock.block.exercises) {
        for (const dist of exercise.distances) {
            if (!runs.some(r => r.exerciseId === exercise.id && r.distance === dist)) {
                completed = false;
                break;
            }
        }
        if (!completed) break;
    }

    if (completed) {
        playerBlock.status = 'completed';
        playerBlock.completedAt = new Date();
        await this.playerBlockRepository.save(playerBlock);
    }
  }

  async seedInitialBlock() {
    let block = await this.blockRepository.findOne({ where: { name: 'Bloque Inicial' } });
    if (!block) {
        block = this.blockRepository.create({
            name: 'Bloque Inicial',
            description: '7 ejercicios base a 6m y 7m',
            order: 1
        });
        await this.blockRepository.save(block);

        const exercises = [
            { name: 'Tiro 1', type: 'shot', order: 1, distances: [6, 7] },
            { name: 'Tiro 2', type: 'shot', order: 2, distances: [6, 7] },
            { name: 'Apuntar 1', type: 'pointing', order: 3, distances: [6, 7] },
            { name: 'Apuntar 2', type: 'pointing', order: 4, distances: [6, 7] },
            { name: 'Cochonet 1', type: 'jack', order: 5, distances: [6, 7] },
            { name: 'Cochonet 2', type: 'jack', order: 6, distances: [6, 7] },
            { name: 'Cochonet 3', type: 'jack', order: 7, distances: [6, 7] },
        ];

        for (const exData of exercises) {
            const ex = this.exerciseRepository.create({ ...exData, blockId: block.id });
            await this.exerciseRepository.save(ex);
        }
    }
    return block;
  }

  async assignBlock(userId: string, blockId: string) {
      const playerBlock = this.playerBlockRepository.create({
          userId,
          blockId,
          status: 'active'
      });
      return this.playerBlockRepository.save(playerBlock);
  }
}
