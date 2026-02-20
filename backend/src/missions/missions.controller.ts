import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MissionsService } from './missions.service';

@Controller('missions')
@UseGuards(JwtAuthGuard)
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  @Get('today')
  async getToday(@Request() req) {
    return this.missionsService.getTodayMission(req.user.id);
  }

  @Post(':id/attempt')
  async recordAttempt(
    @Param('id') assignmentId: string,
    @Request() req,
    @Body() body: { notes: string; evidenceUrl?: string },
  ) {
    return this.missionsService.recordAttempt(req.user.id, assignmentId, body.notes, body.evidenceUrl);
  }

  @Post('seed')
  async seed() {
    await this.missionsService.seedTemplates();
    return { message: 'Templates seeded' };
  }
}
