import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PlayerBlock } from './player-block.entity';
import { Exercise } from './exercise.entity';

@Entity('training_blocks')
export class TrainingBlock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int' })
  order: number;

  @OneToMany(() => PlayerBlock, (playerBlock) => playerBlock.block)
  playerBlocks: PlayerBlock[];

  @OneToMany(() => Exercise, (exercise) => exercise.block)
  exercises: Exercise[];
}
