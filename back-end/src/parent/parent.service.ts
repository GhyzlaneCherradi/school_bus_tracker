import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../user/Entities/user.entity';
import { Child } from './entities/child.entity';
import { Alert } from './entities/alert.entity';
import { ParentSettings } from './entities/parent-settings.entity';
import { UpdateParentSettingsDto } from './dto/update-parent-settings.dto';

@Injectable()
export class ParentService {
  constructor(
    // Injection des repositories TypeORM pour accéder à la base
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Child)
    private readonly childRepository: Repository<Child>,

    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,

    @InjectRepository(ParentSettings)
    private readonly settingsRepository: Repository<ParentSettings>,
  ) { }

  // Récupèration des infos du parent (profil)
  async getProfile(parentId: string) {
    const user = await this.userRepository.findOne({ where: { id: parentId } });

    // Si l'utilisateur n'existe pas → retourne null
    if (!user) return null;

    // formatage des données pour le front (DTO simple)
    return {
      name: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      phone: user.phoneNumber || '',
      address: '', // pas encore utilisé
      relation: 'Parent',
      latitude: user.latitude ? Number(user.latitude) : null,
      longitude: user.longitude ? Number(user.longitude) : null,
    };
  }

  // Récupère la liste des enfants liés à un parent
  async getChildren(parentId: string) {
    const children = await this.childRepository.find({
      where: { parent: { id: parentId } },
      order: { createdAt: 'DESC' }, // les plus récents d'abord
    });

    // On transforme les entités en objet simple pour le front
    return children.map((child) => ({
      id: child.id,
      name: child.name,
      level: child.level,
      school: child.school,
      busId: child.busId,
      driverName: child.driverName,
      driverPhone: child.driverPhone,
      pickupTime: child.pickupTime,
    }));
  }

  // Récupère toutes les alertes liées aux enfants du parent
  async getAlerts(parentId: string) {
    // 1. récupérer les enfants du parent
    const children = await this.childRepository.find({
      where: { parent: { id: parentId } },
      select: ['id'], // on a besoin uniquement des IDs
    });

    if (children.length === 0) return [];

    const childIds = children.map((child) => child.id);

    // 2. récupérer les alertes associées à ces enfants
    const alerts = await this.alertRepository.find({
      where: { child: { id: In(childIds) } },
      relations: ['child'], // pour récupérer les infos de l'enfant
      order: { createdAt: 'DESC' },
    });

    // 3. formatage des données
    return alerts.map((alert) => ({
      id: alert.id,
      type: alert.type,
      title: alert.title,
      message: alert.message,
      childId: alert.child?.id ?? null,
      createdAt: alert.createdAt,
      read: alert.read,
    }));
  }

  // Récupère les paramètres du parent
  async getSettings(parentId: string) {
    let settings = await this.settingsRepository.findOne({
      where: { parent: { id: parentId } },
    });

    // Si aucun settings n'existe → on en crée un par défaut
    if (!settings) {
      settings = this.settingsRepository.create({
        parent: { id: parentId } as User,
      });
      settings = await this.settingsRepository.save(settings);
    }

    // On renvoie uniquement les champs utiles
    return {
      notificationsEnabled: settings.notificationsEnabled,
      vibrationEnabled: settings.vibrationEnabled,
      delayThresholdMinutes: settings.delayThresholdMinutes,
      language: settings.language,
      selectedChildId: settings.selectedChildId,
    };
  }

  // Met à jour les paramètres du parent
  async updateSettings(parentId: string, dto: UpdateParentSettingsDto) {
    let settings = await this.settingsRepository.findOne({
      where: { parent: { id: parentId } },
    });

    // Si pas encore de settings → on en crée un
    if (!settings) {
      settings = this.settingsRepository.create({
        parent: { id: parentId } as User,
      });
    }

    // On applique les nouvelles valeurs envoyées par le front
    Object.assign(settings, dto);

    // Sauvegarde en base
    const saved = await this.settingsRepository.save(settings);

    // Retour formaté
    return {
      notificationsEnabled: saved.notificationsEnabled,
      vibrationEnabled: saved.vibrationEnabled,
      delayThresholdMinutes: saved.delayThresholdMinutes,
      language: saved.language,
      selectedChildId: saved.selectedChildId,
    };
  }

  // Récupère tous les push tokens des parents liés à un bus donné
  async getPushTokensByBusId(busId: string): Promise<string[]> {
    // 1. récupérer les enfants associés au bus
    const children = await this.childRepository.find({
      where: { busId },
      relations: ['parent'], // important pour accéder au parent
    });

    // 2. utiliser un Set pour éviter les doublons
    const tokens = new Set<string>();

    children.forEach((child) => {
      if (child.parent?.pushToken) {
        tokens.add(child.parent.pushToken);
      }
    });

    // 3. retourner un tableau simple
    return Array.from(tokens);
  }
}