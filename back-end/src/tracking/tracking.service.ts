import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusLocation } from './entities/bus-location.entity';

import { CreateBusLocationDto } from './dto/create-bus-location.dto';
import { ParentService } from '../parent/parent.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class TrackingService {
  // Map pour suivre la dernière fois qu'on a envoyé une notif de début de trajet par bus
  private lastTripNotification = new Map<string, Date>();

  // Temps d'attente (30 min) avant de considérer qu'un nouveau trajet commence
  private readonly TRIP_LOCKOUT_MS = 30 * 60 * 1000;

  constructor(
    @InjectRepository(BusLocation)
    private readonly busLocationRepository: Repository<BusLocation>,
    private readonly parentService: ParentService,
    private readonly notificationService: NotificationService,
  ) { }

  // Enregistre une nouvelle position GPS envoyée par le driver
  async saveLocation(data: CreateBusLocationDto): Promise<BusLocation> {
    const location = this.busLocationRepository.create({
      ...data,
      timestamp: data.timestamp || new Date(),
    });

    console.log("in save location")
    // vérifie si c'est le début d'un trajet pour envoyer une notification aux parents
    await this.handleTripNotification(data.busId);

    console.log(location);
    return this.busLocationRepository.save(location);
  }

  // Logique  pour décider d'envoyer une notification (bus en route)
  private async handleTripNotification(busId: string) {
    const now = new Date();
    const lastNotif = this.lastTripNotification.get(busId);
    console.log("is handle trip notification");
    // Si c'est la 1 er position ou si le bus était inactif 
    if (!lastNotif || now.getTime() - lastNotif.getTime() > this.TRIP_LOCKOUT_MS) {

      // on  met à jour l'heure de la dernière notification pour ce bus
      this.lastTripNotification.set(busId, now);

      try {
        // 1. Récupérer les tokens des parents dont les enfants sont dans ce bus
        const tokens = await this.parentService.getPushTokensByBusId(busId);
        console.log("helllooooooooooooooo", tokens);
        if (tokens.length > 0) {
          console.log(`Envoi de notification de trajet pour le bus ${busId} à ${tokens.length} parents.`);
          // 2. Envoyer la notification à chaque parent  de la liste
          for (const token of tokens) {
            this.notificationService.sendNotification(
              token,
              'Bus en route !',
              'Le bus de votre enfant vient de démarrer son trajet. Suivez-le en temps réel !',
              { busId, type: 'TRIP_START' }
            );
          }
        }
      } catch (error) {
        console.error('Erreur lors de la notification de début de trajet:', error);
      }
    }
  }

  // getl'historique des positions pour un bus (pour tracer le trajet sur la carte)
  async getLatestLocations(busId: string, limit = 10): Promise<BusLocation[]> {
    return this.busLocationRepository.find({
      where: { busId },
      order: { timestamp: 'DESC' },
      take: limit,
    });
  }
}
