import { Controller, Post, Body, Get, UseGuards, Request, Param, Put } from '@nestjs/common';
import { MerciService } from './merci.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';
import { CreateMerciAssessmentDto, ApproveMerciAssessmentDto } from './dto/merci.dto';
import { GatingGuard } from '../onboarding/gating.guard';

@Controller('merci')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MerciController {
  constructor(private merciService: MerciService) {}

  @Post()
  @Roles(UserRole.USER)
  @UseGuards(GatingGuard)
  async submitAssessment(@Request() req, @Body() dto: CreateMerciAssessmentDto) {
    return this.merciService.create(req.user.id, dto);
  }

  @Get('my-results')
  @Roles(UserRole.USER)
  @UseGuards(GatingGuard)
  async getMyResults(@Request() req) {
    return this.merciService.findByPlayer(req.user.id);
  }

  @Get('all')
  @Roles(UserRole.COACH)
  async getAll() {
    return this.merciService.findAll();
  }

  @Put(':id/approve')
  @Roles(UserRole.COACH)
  async approveAssessment(@Param('id') id: string, @Body() dto: ApproveMerciAssessmentDto) {
    return this.merciService.approve(id, dto);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.merciService.findById(id);
  }
}
