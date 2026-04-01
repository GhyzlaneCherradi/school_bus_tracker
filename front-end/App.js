import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { Provider } from "react-redux";
import store from "./src/Redux/store";
import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { setupNotificationListeners } from './src/services/NotificationService';

// Ce composant décide quelle navigation afficher en fonction de l'état de connexion
function RootNavigator() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // On met en place les écouteurs de notifications dès le démarrage de l'app.
    // Cleanup permet de les supprimer proprement si le composant est démonté.
    const cleanup = setupNotificationListeners(notificationListener, responseListener);
    
    return () => {
      cleanup();
    };
  }, []);

  return (
    <NavigationContainer>
      {/* Si l'utilisateur est connecté → Drawer (menu latéral), sinon → Stack (Login) */}
      {isLoggedIn ? <DrawerNavigator /> : <StackNavigator />}
    </NavigationContainer>
  );
}

// Le composant racine qui enveloppe toute l'application
export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
