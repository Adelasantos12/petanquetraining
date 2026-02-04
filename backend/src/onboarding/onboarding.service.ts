import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerProfile } from '../entities/player-profile.entity';
import { Commitment } from '../entities/commitment.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class OnboardingService {
  constructor(
    @InjectRepository(PlayerProfile)
    private profileRepository: Repository<PlayerProfile>,
    @InjectRepository(Commitment)
    private commitmentRepository: Repository<Commitment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getProfile(userId: string) {
    let profile = await this.profileRepository.findOne({ where: { userId } });
    if (!profile) {
      profile = this.profileRepository.create({ userId, onboardingStep: 'profile' });
      await this.profileRepository.save(profile);
    }
    return profile;
  }

  async updateProfile(userId: string, data: any) {
    const profile = await this.getProfile(userId);
    Object.assign(profile, data);
    profile.onboardingStep = 'commitment';
    return this.profileRepository.save(profile);
  }

  async signCommitment(userId: string, metadata: any) {
    const profile = await this.getProfile(userId);
    if (profile.onboardingStep !== 'commitment') {
      throw new BadRequestException('Must complete profile first');
    }

    const commitment = this.commitmentRepository.create({
      userId,
      version: '1.0',
      metadata,
    });
    await this.commitmentRepository.save(commitment);

    profile.onboardingStep = 'payment';
    return this.profileRepository.save(profile);
  }

  async completePayment(userId: string) {
    const profile = await this.getProfile(userId);
    profile.onboardingStep = 'scheduling';
    return this.profileRepository.save(profile);
  }

  async completeScheduling(userId: string) {
    const profile = await this.getProfile(userId);
    profile.onboardingStep = 'completed';
    return this.profileRepository.save(profile);
  }
}
