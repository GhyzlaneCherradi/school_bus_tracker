import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../services/AuthService";
import { loginStart, loginSuccess, loginFailure } from "../Redux/auth_Slice";

const useAuth = () => { // l'etat setIsloggedIn vient du composant parent
                                     // ce hook modifie un état global (ou partagé) sans le posséder
                                     // prob 1: Couplage fort avec le parent => n’est pas autonome
                                     // prob 2: Viol de : Single Source of Truth
                                     // prob 3: props drilling
              // => solution : Un état global doit être centralisé (Context ou Redux), pas distribué via des fonctions.
 const dispatch = useDispatch();
 const { error, loading } = useSelector((state) => state.auth);

  const login = async (email, password) => {
    if (!email || !password) {
      dispatch(loginFailure("Veuillez remplir tous les champs"));
      return false;
    }

    dispatch(loginStart());

    try {
      await loginUser(email, password);
      dispatch(loginSuccess());
      return true;
    } catch (err) {
      if (err.message === "INVALID_CREDENTIALS") {
        dispatch(loginFailure("Email ou mot de passe incorrect"));
      } else {
        dispatch(loginFailure("Une erreur est survenue lors de la connexion"));
      }
      return false;
    }
  };

  return { login, error, loading };
};

export default useAuth;