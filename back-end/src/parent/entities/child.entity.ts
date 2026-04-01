import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/Entities/user.entity';

@Entity('children')
export class Child {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  level: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  school: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  busId: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  driverName: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  driverPhone: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  pickupTime: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  parent: User;

  @CreateDateColumn()
  createdAt: Date;
}
