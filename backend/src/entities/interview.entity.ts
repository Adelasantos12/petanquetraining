import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

export enum InterviewDecision {
  PASS = 'pasa a diagnóstico',
  WAITLIST = 'waitlisted',
  REJECT = 'not eligible',
  PENDING = 'pending',
}

@Entity('interviews')
export class Interview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  scheduledAt: Date;

  @Column({ nullable: true })
  meetingUrl: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'enum', enum: InterviewDecision, default: InterviewDecision.PENDING })
  decision: InterviewDecision;

  @Column({ nullable: true })
  completedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
