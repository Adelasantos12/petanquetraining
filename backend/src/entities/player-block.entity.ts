import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { TrainingBlock } from './training-block.entity';

@Entity('player_blocks')
export class PlayerBlock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.playerBlocks)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'block_id' })
  blockId: string;

  @ManyToOne(() => TrainingBlock, (block) => block.playerBlocks)
  @JoinColumn({ name: 'block_id' })
  block: TrainingBlock;

  @Column({ default: 'active' })
  status: string; // active, completed

  @CreateDateColumn()
  startedAt: Date;

  @Column({ nullable: true })
  completedAt: Date;
}
