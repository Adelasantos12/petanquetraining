import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { TrainingBlock } from './training-block.entity';
import { PlayerExerciseRun } from './player-exercise-run.entity';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'block_id' })
  blockId: string;

  @ManyToOne(() => TrainingBlock, (block) => block.exercises)
  @JoinColumn({ name: 'block_id' })
  block: TrainingBlock;

  @Column()
  name: string;

  @Column()
  type: string; // shot, pointing, jack

  @Column({ type: 'int' })
  order: number;

  @Column({ type: 'simple-array' })
  distances: number[];

  @OneToMany(() => PlayerExerciseRun, (run) => run.exercise)
  runs: PlayerExerciseRun[];
}
