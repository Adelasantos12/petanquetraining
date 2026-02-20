import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { MissionTemplate } from './mission-template.entity';

@Entity('mission_assignments')
export class MissionAssignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'template_id' })
  templateId: string;

  @ManyToOne(() => MissionTemplate)
  @JoinColumn({ name: 'template_id' })
  template: MissionTemplate;

  @Column({ default: 'assigned' })
  status: string; // assigned, completed

  @Column({ type: 'date' })
  date: string;

  @CreateDateColumn()
  createdAt: Date;
}
