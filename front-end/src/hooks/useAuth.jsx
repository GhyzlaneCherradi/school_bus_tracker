import { useState } from "react";
import axios from "axios";
import AuthAPI from "../apis/AuthAPI";
import * as SecureStore from 'expo-secure-store';
const useAuth=(setisloggedin)=>{
    const [error,setError]=useState("");
    const login= async(email, password)=>{
        const response=await AuthAPI.post("/auth/login",{email,password});
      console.log(response.data);
 if(response.data.message==="connexion reussie"){
   await SecureStore.setItemAsync("access_token",response.data.token);
     setisloggedin(true);
     setError(""); 
     return true;
   }else{
    setError("Email ou mot de passe incorrect");
      return false;
   }
};
return {login,error};
}

export default useAuth;