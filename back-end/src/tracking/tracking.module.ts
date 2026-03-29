import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingService } from './tracking.service';
import { TrackingGateway } from './tracking.gateway';
import { BusLocation } from './entities/bus-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusLocation])],
  providers: [TrackingService, TrackingGateway],
  exports: [TrackingService],
})
export class TrackingModule {}
