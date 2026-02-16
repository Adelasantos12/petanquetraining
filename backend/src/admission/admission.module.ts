import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmissionDecision } from '../entities/admission-decision.entity';
import { AdmissionService } from './admission.service';
import { AdmissionController } from './admission.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdmissionDecision]), UsersModule],
  providers: [AdmissionService],
  controllers: [AdmissionController],
  exports: [AdmissionService],
})
export class AdmissionModule {}
