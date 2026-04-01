import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentController } from './parent.controller';
import { ParentService } from './parent.service';
import { User } from '../user/Entities/user.entity';
import { Child } from './entities/child.entity';
import { Alert } from './entities/alert.entity';
import { ParentSettings } from './entities/parent-settings.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Child, Alert, ParentSettings]),
    AuthModule,
  ],
  controllers: [ParentController],
  providers: [ParentService],
  exports: [ParentService],
})
export class ParentModule {}
