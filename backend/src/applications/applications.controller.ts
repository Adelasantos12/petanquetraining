import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  async create(@Request() req, @Body() dto: CreateApplicationDto) {
    return this.applicationsService.create(req.user.id, dto);
  }

  @Get('me')
  async getMe(@Request() req) {
    return this.applicationsService.getByUserId(req.user.id);
  }
}
