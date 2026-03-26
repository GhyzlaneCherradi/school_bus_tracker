import { Controller,Get,Post,Body,UseGuards} from '@nestjs/common';
import {AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body:{email: string, password:string,role:string}): string {
    const {email, password,role}= body;
  return this.authService.register(email, password,role) ;}


  @Post('login')
  login(@Body() body:{email: string, password: string}){
    console.log(body)
    const {email, password}= body;
    return this.authService.loginjwt(email, password);
}
@UseGuards(AuthGuard())
@Get('users')
getUsers(){
    console.log(this.authService.getUsers())
    return this.authService.getUsers();
}

} 


