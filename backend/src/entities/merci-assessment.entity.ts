import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('merci_assessments')
export class MerciAssessment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.merciAssessments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int' })
  motricity: number;

  @Column({ type: 'int' })
  emotions: number;

  @Column({ type: 'int' })
  relationships: number;

  @Column({ type: 'int' })
  fiveSenses: number;

  @Column({ type: 'int' })
  intelligence: number;

  @Column({ type: 'int' })
  totalScore: number;

  @Column({ nullable: true })
  rank: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ default: 'pending' })
  status: string; // pending, approved

  @Column({ type: 'text', nullable: true })
  coachComments: string;

  @CreateDateColumn()
  createdAt: Date;
}
