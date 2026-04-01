import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService
  ) { }
  //login method
  async login(email: string, password: string): Promise<string> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return 'cridentials invalide';
    }
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? 'connexion reussie' : 'cridentials invalide';
  }

  // login +jwt generation (access token)

  async loginjwt(email: string, password: string): Promise<any> {
    if (!email || !password) {
      throw new UnauthorizedException("email or password is missing !!");
    }

    const user = await this.userService.findByEmail(email);
    if (!user) {
      console.log("okk");
      throw new UnauthorizedException("invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("ok");
      throw new UnauthorizedException("invalid credentials");
    }

    // creation du payload 
    const payload = {
      email: user.email,
      role: user.role,
      sub: user.id
    };

    // géneration du token 
    const access_token = this.jwtService.sign(payload);

    // Envoi d'une notification de test si un pushToken existe
    if (user.pushToken) {
      this.notificationService.sendNotification(
        user.pushToken,
        'Connexion réussie',
        'Bienvenue dans l\'application ! Vos notifications sont prêtes.',
      );
    }

    // retour du token au client
    return {
      message: 'connexion reussie',
      token: access_token,
      role: user.role,
      userId: user.id,
    };
  }

  async getUsers() {
    return this.userService.findAll();
  }
}
