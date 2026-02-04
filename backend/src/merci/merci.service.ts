import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MerciAssessment } from '../entities/merci-assessment.entity';
import { CreateMerciAssessmentDto, ApproveMerciAssessmentDto } from './dto/merci.dto';

@Injectable()
export class MerciService {
  constructor(
    @InjectRepository(MerciAssessment)
    private merciRepository: Repository<MerciAssessment>,
  ) {}

  async create(userId: string, dto: CreateMerciAssessmentDto) {
    const totalScore = dto.motricity + dto.emotions + dto.relationships + dto.fiveSenses + dto.intelligence;

    const assessment = this.merciRepository.create({
      userId,
      ...dto,
      totalScore,
      status: 'pending',
    });

    return this.merciRepository.save(assessment);
  }

  async approve(id: string, dto: ApproveMerciAssessmentDto) {
    const assessment = await this.merciRepository.findOne({ where: { id } });
    if (!assessment) throw new NotFoundException('Assessment not found');

    assessment.coachComments = dto.coachComments;
    assessment.rank = dto.rank ?? '';
    assessment.notes = dto.notes ?? '';
    assessment.status = 'approved';

    return this.merciRepository.save(assessment);
  }

  async findByPlayer(userId: string) {
    return this.merciRepository.find({
      where: { userId, status: 'approved' },
      order: { createdAt: 'DESC' },
    });
  }

  async findAll() {
    return this.merciRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: string) {
    return this.merciRepository.findOne({ where: { id } });
  }
}
