import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
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
      throw new UnauthorizedException("invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
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

    // retour du token au client
    return {
      message: 'connexion reussie',
      token: access_token
    };
  }

  async getUsers() {
    return this.userService.findAll();
  }
}
