import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { AdmissionService } from './admission.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';

@Controller('admission')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdmissionController {
  constructor(private readonly admissionService: AdmissionService) {}

  @Get('me')
  async getMe(@Request() req) {
    return this.admissionService.getMe(req.user.id);
  }

  @Post('decide')
  @Roles(UserRole.COACH)
  async decide(@Request() req, @Body() body: any) {
    return this.admissionService.decide(body.userId, req.user.id, body.decision, body.reason);
  }
}
