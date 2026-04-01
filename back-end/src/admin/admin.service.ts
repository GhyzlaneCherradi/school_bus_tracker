import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/Entities/user.entity';
import { Child } from '../parent/entities/child.entity';
import { Alert } from '../parent/entities/alert.entity';
import { CreateChildAdminDto } from './dto/create-child-admin.dto';
import { CreateAlertAdminDto } from './dto/create-alert-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Child)
    private readonly childRepository: Repository<Child>,
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
  ) {}

  async createChild(dto: CreateChildAdminDto) {
    const parent = await this.userRepository.findOne({ where: { id: dto.parentId } });
    if (!parent) throw new NotFoundException('Parent not found');

    const child = this.childRepository.create({
      parent,
      name: dto.name,
      level: dto.level,
      school: dto.school,
      busId: dto.busId,
      driverName: dto.driverName,
      driverPhone: dto.driverPhone,
      pickupTime: dto.pickupTime,
    });

    return this.childRepository.save(child);
  }

  async createAlert(dto: CreateAlertAdminDto) {
    const child = await this.childRepository.findOne({ where: { id: dto.childId } });
    if (!child) throw new NotFoundException('Child not found');

    const alert = this.alertRepository.create({
      child,
      type: dto.type,
      title: dto.title,
      message: dto.message,
      read: dto.read ?? false,
    });

    return this.alertRepository.save(alert);
  }
}
