import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { InterviewsService } from './interviews.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';

@Controller('interviews')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  @Get('me')
  async getMe(@Request() req) {
    return this.interviewsService.getMe(req.user.id);
  }

  @Post('schedule')
  @Roles(UserRole.COACH)
  async schedule(@Body() body: any) {
    return this.interviewsService.schedule(body.userId, body.scheduledAt, body.meetingUrl);
  }

  @Post('complete')
  @Roles(UserRole.COACH)
  async complete(@Body() body: any) {
    return this.interviewsService.complete(body.userId, body.notes, body.decision);
  }
}
