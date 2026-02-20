import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionsService } from './missions.service';
import { MissionsController } from './missions.controller';
import { MissionTemplate } from '../entities/mission-template.entity';
import { MissionAssignment } from '../entities/mission-assignment.entity';
import { Attempt } from '../entities/attempt.entity';
import { GamificationModule } from '../gamification/gamification.module';
import { MerciModule } from '../merci/merci.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MissionTemplate, MissionAssignment, Attempt]),
    GamificationModule,
    MerciModule,
  ],
  providers: [MissionsService],
  controllers: [MissionsController],
})
export class MissionsModule {}
