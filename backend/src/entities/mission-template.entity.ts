import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('mission_templates')
export class MissionTemplate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  domain: string; // motricity, emotions, etc.

  @Column({ default: 100 })
  xpReward: number;

  @Column({ type: 'jsonb', nullable: true })
  checklist: string[];

  @CreateDateColumn()
  createdAt: Date;
}
