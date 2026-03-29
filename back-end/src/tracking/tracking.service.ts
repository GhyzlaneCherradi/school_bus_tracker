import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusLocation } from './entities/bus-location.entity';

import { CreateBusLocationDto } from './dto/create-bus-location.dto';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(BusLocation)
    private readonly busLocationRepository: Repository<BusLocation>,
  ) {}

  async saveLocation(data: CreateBusLocationDto): Promise<BusLocation> {
    const location = this.busLocationRepository.create({
      ...data,
      timestamp: data.timestamp || new Date(),
    });
   console.log(location);
    return this.busLocationRepository.save(location);
  }

  async getLatestLocations(busId: string, limit = 10): Promise<BusLocation[]> {
    return this.busLocationRepository.find({
      where: { busId },
      order: { timestamp: 'DESC' },
      take: limit,
    });
  }
}
