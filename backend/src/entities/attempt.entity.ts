import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { MissionAssignment } from './mission-assignment.entity';

@Entity('attempts')
export class Attempt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'assignment_id' })
  assignmentId: string;

  @ManyToOne(() => MissionAssignment)
  @JoinColumn({ name: 'assignment_id' })
  assignment: MissionAssignment;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ nullable: true })
  evidenceUrl: string;

  @Column({ default: 'submitted' })
  status: string; // submitted, approved, rejected

  @CreateDateColumn()
  createdAt: Date;
}
