import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { TrainingService } from './training.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RecordResultDto } from './dto/record-result.dto';
import { GatingGuard } from '../onboarding/gating.guard';

@Controller('training')
@UseGuards(JwtAuthGuard, GatingGuard)
export class TrainingController {
  constructor(private trainingService: TrainingService) {}

  @Get('active-block')
  async getActiveBlock(@Request() req) {
    return this.trainingService.getActiveBlock(req.user.id);
  }

  @Post('record-result')
  async recordResult(@Request() req, @Body() dto: RecordResultDto) {
    return this.trainingService.recordResult(req.user.id, dto);
  }

  @Post('debug/init-first-block')
  async initFirstBlock(@Request() req) {
      const block = await this.trainingService.seedInitialBlock();
      return this.trainingService.assignBlock(req.user.id, block.id);
  }
}
