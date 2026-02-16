import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PlayerProfile } from './player-profile.entity';
import { Commitment } from './commitment.entity';
import { Payment } from './payment.entity';
import { MerciAssessment } from './merci-assessment.entity';
import { PlayerBlock } from './player-block.entity';
import { PlayerExerciseRun } from './player-exercise-run.entity';

export enum UserRole {
  COACH = 'coach',
  USER = 'user',
}

export enum UserStatus {
  LEAD = 'lead',
  APPLICANT_SUBMITTED = 'applicant_submitted',
  PRESELECTED = 'preselected',
  INTERVIEW_SCHEDULED = 'interview_scheduled',
  INTERVIEW_COMPLETED = 'interview_completed',
  DIAGNOSTIC_UNLOCKED = 'diagnostic_unlocked',
  DIAGNOSTIC_IN_PROGRESS = 'diagnostic_in_progress',
  DIAGNOSTIC_COMPLETED = 'diagnostic_completed',
  ACCEPTED = 'accepted',
  PAYMENT_PENDING = 'payment_pending',
  ACTIVE_MEMBER = 'active_member',
  DELINQUENT = 'delinquent',
  SUSPENDED = 'suspended',
  WAITLISTED = 'waitlisted',
  NOT_ELIGIBLE = 'not_eligible',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.LEAD })
  status: UserStatus;

  @Column({ default: 'ES' })
  preferredLanguage: string; // ES, EN, FR

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => PlayerProfile, (profile) => profile.user)
  profile: PlayerProfile;

  @OneToMany(() => Commitment, (commitment) => commitment.user)
  commitments: Commitment[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToMany(() => MerciAssessment, (assessment) => assessment.user)
  merciAssessments: MerciAssessment[];

  @OneToMany(() => PlayerBlock, (playerBlock) => playerBlock.user)
  playerBlocks: PlayerBlock[];

  @OneToMany(() => PlayerExerciseRun, (run) => run.user)
  exerciseRuns: PlayerExerciseRun[];
}
