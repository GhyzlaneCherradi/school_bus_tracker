import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {Strategy,ExtractJwt} from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(){
        super({
      // Où trouver le token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // algorithm de signature autorise 
      algorithms:['HS256'],
      // Ne pas ignorer expiration
      ignoreExpiration: false,
      //  Clé secrète (doit être la même que JwtModule)
      secretOrKey: 'mySecretKey',
    });

   }
    validate(payload:any){
        // le payload sera injecté dans user.req
        return payload;
    }

}