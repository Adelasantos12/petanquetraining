import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UserStatusService } from '../users/user-status.service';
import { UserStatus } from '../entities/user.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    private statusService: UserStatusService,
  ) {}

  async create(userId: string, dto: CreateApplicationDto) {
    // 1. Calculate readiness score
    let readinessScore = 0;
    if (dto.weeklyTrainingHoursAvailable >= 4) readinessScore += 20;
    if (dto.accessToCourt) readinessScore += 20;
    if (dto.accessToEquipment) readinessScore += 10;
    if (dto.canRecordTrainingResults) readinessScore += 10;
    if (dto.acceptanceOfDisciplineRules) readinessScore += 20;
    if (dto.willingnessQuincenalReview) readinessScore += 20;

    // 2. Hard filters
    const hardFilterPassed =
        dto.weeklyTrainingHoursAvailable >= 4 &&
        dto.accessToCourt &&
        dto.acceptanceOfDisciplineRules &&
        dto.willingnessQuincenalReview;

    // 3. Soft score (placeholder logic)
    const softScore = Math.min(100, dto.tournamentsPerYearCurrent * 10);

    const application = this.applicationRepository.create({
      ...dto,
      userId,
      readinessScore,
      hardFilterPassed,
      softScoreComponent: softScore,
      submittedAt: new Date(),
    });

    await this.applicationRepository.save(application);

    // 4. Update user status
    if (!hardFilterPassed) {
        await this.statusService.updateStatus(userId, UserStatus.NOT_ELIGIBLE, 'Failed hard filters (availability/court/rules)');
    } else {
        await this.statusService.updateStatus(userId, UserStatus.APPLICANT_SUBMITTED);
    }

    return application;
  }

  async getByUserId(userId: string) {
    return this.applicationRepository.findOne({ where: { userId } });
  }
}
