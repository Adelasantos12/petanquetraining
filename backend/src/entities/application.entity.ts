import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

export enum CompetitiveLevel {
  RECREATIVO = 'recreativo',
  COMPETITIVO_LOCAL = 'competitivo local',
  REGIONAL = 'regional',
  NACIONAL = 'nacional',
  INTERNACIONAL = 'internacional',
}

export enum CountryCode {
  CH = 'CH',
  MX = 'MX',
  OTHER = 'Other',
}

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Section 1: Identification
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: CountryCode })
  country: CountryCode;

  @Column()
  city: string;

  @Column()
  timezone: string;

  // Section 2: Sports Profile
  @Column({ type: 'int' })
  yearsPlaying: number;

  @Column({ type: 'enum', enum: CompetitiveLevel })
  currentLevel: CompetitiveLevel;

  @Column({ type: 'int' })
  tournamentsPerYearCurrent: number;

  @Column({ type: 'int' })
  tournamentsPerYearGoal: number;

  @Column({ nullable: true })
  clubAffiliation: string;

  // Section 3: Availability & Logistics
  @Column({ type: 'int' })
  weeklyTrainingHoursAvailable: number;

  @Column({ default: false })
  accessToCourt: boolean;

  @Column({ default: false })
  accessToEquipment: boolean;

  @Column({ default: false })
  canRecordTrainingResults: boolean;

  @Column({ type: 'simple-array' })
  preferredTrainingDays: string[];

  @Column({ type: 'text', nullable: true })
  healthLimitations: string;

  // Section 4: Motivation
  @Column({ type: 'text' })
  primaryGoal6Months: string;

  @Column({ type: 'text' })
  mainWeaknessSelfPerceived: string;

  @Column({ type: 'text' })
  mainStrengthSelfPerceived: string;

  @Column({ type: 'text' })
  whyThisAcademy: string;

  @Column({ default: false })
  willingnessQuincenalReview: boolean;

  @Column({ default: false })
  acceptanceOfDisciplineRules: boolean;

  // Section 5: Declarations
  @Column({ default: false })
  confirmationTruthfulInformation: boolean;

  @Column({ default: false })
  consentDataProcessing: boolean;

  // Calculated fields
  @Column({ type: 'int', default: 0 })
  readinessScore: number;

  @Column({ default: false })
  hardFilterPassed: boolean;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  softScoreComponent: number;

  @Column({ nullable: true })
  submittedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
