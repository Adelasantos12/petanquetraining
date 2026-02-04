import { Controller, Get, Body, UseGuards, Param, Put } from '@nestjs/common';
import { CoachService } from './coach.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';

@Controller('coach')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.COACH)
export class CoachController {
  constructor(private coachService: CoachService) {}

  @Get('players')
  async getAllPlayers() {
    return this.coachService.findAllPlayers();
  }

  @Get('players/:id')
  async getPlayerDetails(@Param('id') id: string) {
    return this.coachService.getPlayerDetails(id);
  }

  @Put('players/:id/notes')
  async updateNotes(@Param('id') id: string, @Body('notes') notes: string) {
    return this.coachService.updateTechnicalNotes(id, notes);
  }

  @Put('players/:id/status')
  async toggleStatus(@Param('id') id: string, @Body('isActive') isActive: boolean) {
    return this.coachService.toggleUserStatus(id, isActive);
  }
}
