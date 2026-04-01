import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/Entities/user.entity';

@Entity('parent_settings')
export class ParentSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  parent: User;

  @Column({ type: 'boolean', default: true })
  notificationsEnabled: boolean;

  @Column({ type: 'boolean', default: true })
  vibrationEnabled: boolean;

  @Column({ type: 'int', default: 10 })
  delayThresholdMinutes: number;

  @Column({ type: 'varchar', length: 30, default: 'English' })
  language: string;

  @Column({ type: 'uuid', nullable: true })
  selectedChildId: string | null;

  @UpdateDateColumn()
  updatedAt: Date;
}
