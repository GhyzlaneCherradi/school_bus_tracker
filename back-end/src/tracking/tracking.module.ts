import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingService } from './tracking.service';
import { TrackingGateway } from './tracking.gateway';
import { BusLocation } from './entities/bus-location.entity';
import { ParentModule } from '../parent/parent.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BusLocation]),
    ParentModule,
    NotificationModule,
  ],
  providers: [TrackingService, TrackingGateway],
  exports: [TrackingService],
})
export class TrackingModule {}
