import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('commitments')
export class Commitment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.commitments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  version: string;

  @CreateDateColumn()
  signedAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  metadata: any;
}
