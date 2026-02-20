import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamificationService } from './gamification.service';
import { UserGamification } from '../entities/user-gamification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserGamification]),
  ],
  providers: [GamificationService],
  exports: [GamificationService],
})
export class GamificationModule {}
