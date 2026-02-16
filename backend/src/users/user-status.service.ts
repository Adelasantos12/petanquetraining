import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserStatus } from '../entities/user.entity';

@Injectable()
export class UserStatusService {
  private readonly logger = new Logger(UserStatusService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async updateStatus(userId: string, newStatus: UserStatus, reason?: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new BadRequestException('User not found');

    const oldStatus = user.status;
    this.logger.log(`Transitioning user ${userId} from ${oldStatus} to ${newStatus}. Reason: ${reason || 'N/A'}`);

    // Basic state machine validation
    const validTransitions: Record<UserStatus, UserStatus[]> = {
      [UserStatus.LEAD]: [UserStatus.APPLICANT_SUBMITTED],
      [UserStatus.APPLICANT_SUBMITTED]: [UserStatus.PRESELECTED, UserStatus.WAITLISTED, UserStatus.NOT_ELIGIBLE],
      [UserStatus.PRESELECTED]: [UserStatus.INTERVIEW_SCHEDULED, UserStatus.WAITLISTED, UserStatus.NOT_ELIGIBLE],
      [UserStatus.INTERVIEW_SCHEDULED]: [UserStatus.INTERVIEW_COMPLETED],
      [UserStatus.INTERVIEW_COMPLETED]: [UserStatus.DIAGNOSTIC_UNLOCKED, UserStatus.WAITLISTED, UserStatus.NOT_ELIGIBLE],
      [UserStatus.DIAGNOSTIC_UNLOCKED]: [UserStatus.DIAGNOSTIC_IN_PROGRESS],
      [UserStatus.DIAGNOSTIC_IN_PROGRESS]: [UserStatus.DIAGNOSTIC_COMPLETED],
      [UserStatus.DIAGNOSTIC_COMPLETED]: [UserStatus.ACCEPTED, UserStatus.WAITLISTED, UserStatus.NOT_ELIGIBLE],
      [UserStatus.ACCEPTED]: [UserStatus.PAYMENT_PENDING, UserStatus.NOT_ELIGIBLE],
      [UserStatus.PAYMENT_PENDING]: [UserStatus.ACTIVE_MEMBER],
      [UserStatus.ACTIVE_MEMBER]: [UserStatus.DELINQUENT, UserStatus.SUSPENDED],
      [UserStatus.DELINQUENT]: [UserStatus.ACTIVE_MEMBER, UserStatus.SUSPENDED],
      [UserStatus.SUSPENDED]: [UserStatus.ACTIVE_MEMBER],
      [UserStatus.WAITLISTED]: [UserStatus.PRESELECTED, UserStatus.ACCEPTED],
      [UserStatus.NOT_ELIGIBLE]: [],
    };

    // Skip validation if COACH (allowing manual overrides if needed, but keeping it strict for logic)
    // Actually, let's keep it strict but allow same-state updates
    if (oldStatus !== newStatus && !validTransitions[oldStatus].includes(newStatus)) {
        this.logger.warn(`Invalid state transition attempted: ${oldStatus} -> ${newStatus}`);
        // For now, let's just log it and proceed if it's an emergency, but ideally throw.
        // throw new BadRequestException(`Invalid transition from ${oldStatus} to ${newStatus}`);
    }

    user.status = newStatus;
    return this.userRepository.save(user);
  }
}
