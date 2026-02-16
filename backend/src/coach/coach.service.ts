import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
import { PlayerProfile } from '../entities/player-profile.entity';
import { MerciAssessment } from '../entities/merci-assessment.entity';
import { PlayerBlock } from '../entities/player-block.entity';
import { Payment } from '../entities/payment.entity';

@Injectable()
export class CoachService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(PlayerProfile)
    private profileRepository: Repository<PlayerProfile>,
    @InjectRepository(MerciAssessment)
    private merciRepository: Repository<MerciAssessment>,
    @InjectRepository(PlayerBlock)
    private playerBlockRepository: Repository<PlayerBlock>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  async findAllPlayers() {
    return this.userRepository.find({
      where: { role: UserRole.USER },
      relations: ['profile'],
    });
  }

  async getPlayerDetails(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId, role: UserRole.USER },
      relations: ['profile', 'merciAssessments', 'playerBlocks', 'playerBlocks.block', 'payments'],
    });

    if (!user) throw new NotFoundException('Player not found');

    return user;
  }

  async updateTechnicalNotes(userId: string, notes: string) {
    const profile = await this.profileRepository.findOne({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');

    profile.technicalNotes = notes;
    return this.profileRepository.save(profile);
  }

  async toggleUserStatus(userId: string, active: boolean) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    user.isActive = active;
    return this.userRepository.save(user);
  }
}
