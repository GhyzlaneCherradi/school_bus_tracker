import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User } from '../user/Entities/user.entity';
import { Child } from '../parent/entities/child.entity';
import { Alert } from '../parent/entities/alert.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Child, Alert]), AuthModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
