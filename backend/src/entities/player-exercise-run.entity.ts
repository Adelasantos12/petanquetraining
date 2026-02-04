import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Exercise } from './exercise.entity';

@Entity('player_exercise_runs')
export class PlayerExerciseRun {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.exerciseRuns)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'exercise_id' })
  exerciseId: string;

  @ManyToOne(() => Exercise, (exercise) => exercise.runs)
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @Column({ type: 'int' })
  distance: number;

  @Column({ type: 'jsonb' })
  balls: number[]; // e.g. [1, 0, 1, 1, 0, 1]

  @Column({ type: 'int' })
  total: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  percentage: number;

  @CreateDateColumn()
  createdAt: Date;
}
