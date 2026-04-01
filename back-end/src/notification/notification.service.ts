import { Injectable, Logger } from '@nestjs/common';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';

@Injectable()
export class NotificationService {
  // Client Expo côté backend :
  // c’est l’objet qui permet d’envoyer des notifications à Expo.
  // IMPORTANT : il n’envoie pas directement au téléphone.
  // Le chemin réel est :
  // Backend → Expo → FCM/APNs → téléphone
  private expo = new Expo();

  // Logger NestJS :
  // utilisé pour afficher des logs propres (erreurs, succès…)
  // NotificationService.name permet d’identifier facilement la source du log.
  private readonly logger = new Logger(NotificationService.name);

  async sendNotification(
    to: string, // token Expo du téléphone cible
    title: string, // titre de la notification
    body: string, // contenu (message)
    data?: any, // données personnalisées (navigation, id, type…)
  ): Promise<void> {

    // Vérification du token :
    // si le token n’est pas valide, on arrête directement
    // pour éviter un appel inutile à Expo.
    if (!Expo.isExpoPushToken(to)) {
      this.logger.error(`Push token ${to} is not a valid Expo push token`);
      return;
    }

    // Construction du message :
    // Expo attend un objet bien structuré.
    // On utilise un tableau même pour un seul message,
    // car Expo supporte l’envoi en batch.
    const messages: ExpoPushMessage[] = [
      {
        to, // destination (token)
        sound: 'default', // son par défaut
        title, // titre affiché
        body, // contenu affiché
        data, // données supplémentaires pour l’app
      },
    ];

    // Découpage en chunks :
    // Expo impose des limites sur le nombre de notifications par requête.
    // Cette fonction découpe automatiquement les messages en petits groupes.
    const chunks = this.expo.chunkPushNotifications(messages);

    // Tableau pour stocker les réponses (tickets)
    // envoyées par Expo après chaque requête.
    const tickets = [];

    // Envoi des notifications chunk par chunk
    for (const chunk of chunks) {
      try {
        // Envoi vers Expo Push API
        // Expo se charge ensuite de router vers FCM (Android) ou APNs (iOS)
        const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);

        // On stocke les tickets retournés
        (tickets as any[]).push(...ticketChunk);
        console.log(ticketChunk);
      } catch (error) {
        // En cas d’erreur (réseau, API, etc.)
        this.logger.error('Erreur lors de l’envoi de la notification', error);
      }
    }

    // NB :
    // En production, on doit normalement :
    // - analyser les tickets
    // - supprimer les tokens invalides de la base de données

    // Log final de succès (envoi effectué côté Expo)
    this.logger.log(`Notification envoyée à ${to}: ${title}`);

  }
}