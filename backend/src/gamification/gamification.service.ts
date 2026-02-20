import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGamification } from '../entities/user-gamification.entity';

@Injectable()
export class GamificationService {
  constructor(
    @InjectRepository(UserGamification)
    private gamificationRepository: Repository<UserGamification>,
  ) {}

  async getForUser(userId: string) {
    let gamification = await this.gamificationRepository.findOne({ where: { userId } });
    if (!gamification) {
      gamification = this.gamificationRepository.create({ userId });
      await this.gamificationRepository.save(gamification);
    }
    return gamification;
  }

  async addXp(userId: string, xp: number) {
    const gamification = await this.getForUser(userId);
    gamification.xpTotal += xp;

    // Check streak
    const today = new Date().toISOString().split('T')[0];
    if (gamification.lastCompletedDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (gamification.lastCompletedDate === yesterdayStr) {
        gamification.streakCurrent += 1;
      } else {
        gamification.streakCurrent = 1;
      }

      if (gamification.streakCurrent > gamification.streakBest) {
        gamification.streakBest = gamification.streakCurrent;
      }
      gamification.lastCompletedDate = today;
    }

    return this.gamificationRepository.save(gamification);
  }
}
