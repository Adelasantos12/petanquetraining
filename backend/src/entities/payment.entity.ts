import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.payments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  externalId: string; // Stripe or PayPal ID

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  status: string; // pending, completed, failed

  @Column()
  type: string; // enrollment, subscription

  @Column({ nullable: true })
  provider: string; // stripe, paypal

  @CreateDateColumn()
  createdAt: Date;
}
