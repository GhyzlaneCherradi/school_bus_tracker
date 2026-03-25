import axios from "axios";
import { API_BASE_URL } from "../../Config/Config";

const AuthAPI= axios.create({
    baseURL:API_BASE_URL,
    timeout:5000,
    headers:{
    "Content-Type":"application/json"
   }
})

export default AuthAPI;