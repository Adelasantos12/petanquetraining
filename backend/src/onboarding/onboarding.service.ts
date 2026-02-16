import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerProfile } from '../entities/player-profile.entity';
import { Commitment } from '../entities/commitment.entity';
import { User } from '../entities/user.entity';

import { UserStatusService } from '../users/user-status.service';
import { UserStatus } from '../entities/user.entity';

@Injectable()
export class OnboardingService {
  constructor(
    @InjectRepository(PlayerProfile)
    private profileRepository: Repository<PlayerProfile>,
    @InjectRepository(Commitment)
    private commitmentRepository: Repository<Commitment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private statusService: UserStatusService,
  ) {}

  async getProfile(userId: string) {
    return this.profileRepository.findOne({ where: { userId } });
  }

  async updateProfile(userId: string, data: any) {
    let profile = await this.getProfile(userId);
    if (!profile) {
        profile = this.profileRepository.create({ userId });
    }
    Object.assign(profile, data);
    return this.profileRepository.save(profile);
  }

  async signCommitment(userId: string, metadata: any) {
    const commitment = this.commitmentRepository.create({
      userId,
      version: '1.0',
      metadata,
    });
    return this.commitmentRepository.save(commitment);
  }

  async completePayment(userId: string) {
    return this.statusService.updateStatus(userId, UserStatus.ACTIVE_MEMBER, 'Payment confirmed');
  }

  async completeScheduling(userId: string) {
    return this.statusService.updateStatus(userId, UserStatus.DIAGNOSTIC_UNLOCKED, 'Interview scheduled');
  }

  async getStatus(userId: string) {
    const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['profile', 'merciAssessments']
    });
    return {
        status: user.status,
        hasProfile: !!user.profile,
        hasAssessment: user.merciAssessments.length > 0,
    };
  }
}
