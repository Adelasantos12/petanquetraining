import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('player_profiles')
export class PlayerProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int', nullable: true })
  yearsOfExperience: number;

  @Column({ type: 'int', nullable: true })
  tournamentsPlayedPerYear: number;

  @Column({ type: 'int', nullable: true })
  tournamentsTargetPerYear: number;

  @Column({ type: 'text', nullable: true })
  strengths: string;

  @Column({ type: 'text', nullable: true })
  weaknesses: string;

  @Column({ type: 'text', nullable: true })
  goalShortTerm: string;

  @Column({ type: 'text', nullable: true })
  goalMediumTerm: string;

  @Column({ type: 'text', nullable: true })
  goalLongTerm: string;

  @Column({ type: 'text', nullable: true })
  technicalNotes: string;

  @Column({ default: 'registration' })
  onboardingStep: string;

  @Column({ default: false })
  isEmailVerified: boolean;
}
