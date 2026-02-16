import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

export enum AdmissionDecisionEnum {
  ACCEPTED = 'accepted',
  WAITLISTED = 'waitlisted',
  NOT_ELIGIBLE = 'not eligible',
  PENDING = 'pending',
}

@Entity('admission_decisions')
export class AdmissionDecision {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'enum', enum: AdmissionDecisionEnum, default: AdmissionDecisionEnum.PENDING })
  decision: AdmissionDecisionEnum;

  @Column({ type: 'text', nullable: true })
  reasonText: string;

  @Column({ name: 'coach_id' })
  coachId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'coach_id' })
  coach: User;

  @Column({ nullable: true })
  decidedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
