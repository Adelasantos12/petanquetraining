import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interview, InterviewDecision } from '../entities/interview.entity';
import { UserStatusService } from '../users/user-status.service';
import { UserStatus } from '../entities/user.entity';

@Injectable()
export class InterviewsService {
  constructor(
    @InjectRepository(Interview)
    private interviewRepository: Repository<Interview>,
    private statusService: UserStatusService,
  ) {}

  async schedule(userId: string, scheduledAt: Date, meetingUrl: string) {
    const interview = this.interviewRepository.create({
      userId,
      scheduledAt,
      meetingUrl,
      decision: InterviewDecision.PENDING,
    });
    await this.interviewRepository.save(interview);
    await this.statusService.updateStatus(userId, UserStatus.INTERVIEW_SCHEDULED);
    return interview;
  }

  async complete(userId: string, notes: string, decision: InterviewDecision) {
    const interview = await this.interviewRepository.findOne({
        where: { userId },
        order: { createdAt: 'DESC' }
    });
    interview.notes = notes;
    interview.decision = decision;
    interview.completedAt = new Date();
    await this.interviewRepository.save(interview);

    if (decision === InterviewDecision.PASS) {
        await this.statusService.updateStatus(userId, UserStatus.DIAGNOSTIC_UNLOCKED);
    } else if (decision === InterviewDecision.WAITLIST) {
        await this.statusService.updateStatus(userId, UserStatus.WAITLISTED);
    } else {
        await this.statusService.updateStatus(userId, UserStatus.NOT_ELIGIBLE);
    }

    return interview;
  }

  async getMe(userId: string) {
    return this.interviewRepository.findOne({
        where: { userId },
        order: { createdAt: 'DESC' }
    });
  }
}
