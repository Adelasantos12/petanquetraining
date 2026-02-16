import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('payment_links')
export class PaymentLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  provider: string; // stripe, paypal

  @Column()
  url: string;

  @Column({ default: 'active' })
  status: string; // active, completed, expired

  @CreateDateColumn()
  createdAt: Date;
}
