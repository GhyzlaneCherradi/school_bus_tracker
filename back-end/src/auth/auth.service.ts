import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';
@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService) {}
private users:any[]=[]; // tableau pour stocker les utilisateur

register(email: string , password : string,role:string) : string 
{
    const user={email:email,password:password,role:role}
    this.users.push(user);
    return 'Utilisateur enregistré avec succès';
}

login(email: string , password : string) : string
{
    const user = this.users.find((user)=>user.email===email&& user.password===password);
    return user ? 'connexion reussie': 'cridentials invalide';
}

loginjwt(email: string , password : string) : any
{
 if(!email || !password){
    return "email or password is missing !!";
 }
 const user = this.users.find((user)=>user.email===email&& user.password===password);
 if(!user){
    return "invalid credentials ";
 }
  // creation du payload 

  const payload={
    email:user.email,
    role:user.role
  }

  //géneration du token 

  const access_token=this.jwtService.sign(payload);

  // retour du token au client
  const response= {
    message: 'connexion reussie',
    token:access_token
  }
  console.log(response);
  return response;

}

getUsers(){
    return this.users;
}
}
