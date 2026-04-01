import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerPushToken } from "../services/AuthService";
import { loginStart, loginSuccess, loginFailure } from "../Redux/auth_Slice";
import { registerForPushNotificationsAsync } from "../services/NotificationService";

const useAuth = () => { // l'etat setIsloggedIn vient du composant parent
                                     // ce hook modifie un état global (ou partagé) sans le posséder
                                     // prob 1: Couplage fort avec le parent => n’est pas autonome
                                     // prob 2: Viol de : Single Source of Truth
                                     // prob 3: props drilling
              // => solution : Un état global doit être centralisé (Context ou Redux), pas distribué via des fonctions.
 const dispatch = useDispatch();
 
 const { error, loading } = useSelector((state) => state.auth);
  const login = async (email, password) => {
    // Validation des entrées
    if (!email || !password) {
      dispatch(loginFailure("Veuillez remplir tous les champs"));
      return false;
    }
    //Orchestration Redux
    dispatch(loginStart());
    try {
      const authData = await loginUser(email, password);
      // Orchestration Redux
      dispatch(loginSuccess(authData?.role || null));

      // Notification Push Registration
      try {
        const pushToken = await registerForPushNotificationsAsync();
        if (pushToken) {
          const success = await registerPushToken(pushToken);
          if (success) {
            console.log("Push token registered successfully");
          }
        }
      } catch (pushErr) {
        console.log("Failed to register push token:", pushErr);
      }

      return true;
    } catch (err) {
      if (err.message === "INVALID_CREDENTIALS") {
        //Orchestration Redux
        dispatch(loginFailure("Email ou mot de passe incorrect"));
      } else {
        //Orchestration Redux
        dispatch(loginFailure("Une erreur est survenue lors de la connexion"));
      }
      return false;
    }
  };

  return { login, error, loading };
};

export default useAuth;