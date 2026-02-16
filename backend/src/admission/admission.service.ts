import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdmissionDecision, AdmissionDecisionEnum } from '../entities/admission-decision.entity';
import { UserStatusService } from '../users/user-status.service';
import { UserStatus } from '../entities/user.entity';

@Injectable()
export class AdmissionService {
  constructor(
    @InjectRepository(AdmissionDecision)
    private admissionRepository: Repository<AdmissionDecision>,
    private statusService: UserStatusService,
  ) {}

  async decide(userId: string, coachId: string, decision: AdmissionDecisionEnum, reason: string) {
    const admission = this.admissionRepository.create({
      userId,
      coachId,
      decision,
      reasonText: reason,
      decidedAt: new Date(),
    });
    await this.admissionRepository.save(admission);

    if (decision === AdmissionDecisionEnum.ACCEPTED) {
        await this.statusService.updateStatus(userId, UserStatus.PAYMENT_PENDING);
    } else if (decision === AdmissionDecisionEnum.WAITLISTED) {
        await this.statusService.updateStatus(userId, UserStatus.WAITLISTED);
    } else {
        await this.statusService.updateStatus(userId, UserStatus.NOT_ELIGIBLE);
    }

    return admission;
  }

  async getMe(userId: string) {
    return this.admissionRepository.findOne({
        where: { userId },
        order: { createdAt: 'DESC' }
    });
  }
}
