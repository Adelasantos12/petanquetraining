import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PlayerProfile } from './player-profile.entity';
import { Commitment } from './commitment.entity';
import { Payment } from './payment.entity';
import { MerciAssessment } from './merci-assessment.entity';
import { PlayerBlock } from './player-block.entity';
import { PlayerExerciseRun } from './player-exercise-run.entity';

export enum UserRole {
  COACH = 'coach',
  PLAYER = 'player',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.PLAYER })
  role: UserRole;

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
