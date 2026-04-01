import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configuration du comportement des notifications
// quand l’application est ouverte au premier plan.
//
// Par défaut, une notification reçue en foreground
// n’est pas toujours affichée comme quand l’app est en arrière-plan.
// Ici, on précise explicitement ce qu’on veut faire.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // affiche l’alerte / bannière
    shouldPlaySound: true, // joue le son
    shouldSetBadge: false, // ne modifie pas le badge de l’app
  }),
});

export const registerForPushNotificationsAsync = async () => {
  let token;

  // 1) Vérifier l’état actuel de la permission notifications
  // On demande d’abord au système :
  // "est-ce que l’utilisateur a déjà donné l’autorisation ?"
  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  // On garde une variable finale qui représentera
  // le vrai statut après vérification / éventuelle demande.
  let finalStatus = existingStatus;

  // 2) Si la permission n’est pas encore accordée,
  // on affiche la popup système pour demander l’autorisation.
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  // 3) Si l’utilisateur refuse, on arrête ici.
  // Sans permission, l’app ne pourra pas exploiter normalement
  // les notifications visibles côté système.
  if (finalStatus !== 'granted') {
    console.log('Failed to get push token for push notification!');
    return null;
  }

  try {
    // 4) Récupération du Expo Push Token
    //
    // Ce token identifie cette application sur cet appareil
    // auprès de l’infrastructure Expo Push.
    //
    // Le projectId permet à Expo de savoir à quel projet cloud
    // rattacher cette demande de token.
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: 'faad833e-369f-45d4-a46c-c0c942de7801',
      })
    ).data;

    console.log('Expo Push Token:', token);
  } catch (e) {
    // Si la récupération du token échoue
    // (réseau, config projet, problème Expo...)
    console.log('Error getting push token:', e);
  }

  // 5) Configuration Android
  //
  // Sur Android, une notification doit appartenir à un channel.
  // Le channel permet de définir son importance, son, vibration, etc.
  // Sur iOS, cette étape n’existe pas sous cette forme.
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default', // nom du channel
      importance: Notifications.AndroidImportance.MAX, // priorité maximale
      vibrationPattern: [0, 250, 250, 250], // schéma de vibration
      lightColor: '#FF231F7C', // couleur de la LED si supportée
    });
  }

  // 6) On retourne le token pour pouvoir l’envoyer au backend
  return token;
};

export const setupNotificationListeners = (
  notificationListener,
  responseListener,
) => {
  // Écouteur 1 :
  // se déclenche quand une notification arrive
  // pendant que l’application est ouverte au premier plan.
  //
  // Ici, on peut :
  // - afficher 
  // - mettre à jour l’UI
  // - stocker la notification
  notificationListener.current =
    Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification reçue au premier plan:', notification);
    });

  // Écouteur 2 :
  // se déclenche quand l’utilisateur clique / tape
  // sur une notification.
  //
  // C’est ici qu’on peut :
  // - naviguer vers un écran précis
  // - ouvrir un chat
  // - lire des données envoyées dans payload.data
  responseListener.current =
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification cliquée:', response);
    });

  // Fonction de nettoyage :
  // à appeler lors du démontage du composant
  // pour éviter de laisser des écouteurs actifs inutilement.
  return () => {
    notificationListener.current?.remove();
    responseListener.current?.remove();
  };
};