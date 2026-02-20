import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_gamification')
export class UserGamification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ default: 0 })
  xpTotal: number;

  @Column({ default: 0 })
  streakCurrent: number;

  @Column({ default: 0 })
  streakBest: number;

  @Column({ type: 'date', nullable: true })
  lastCompletedDate: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
