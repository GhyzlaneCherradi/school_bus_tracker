import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/Create-User.dto';
import { UpdateUserDto } from './dto/Update-User.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    //→ NestJS prend le JSON envoyé dans le body
    //→ le transforme en objet CreateUserDto
    //→ applique la validation
    console.log(createUserDto);
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('parents')
  findParents() {
    return this.userService.findAllParents();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('push-token')
  updatePushToken(@Req() req: any, @Body('pushToken') pushToken: string) {
    return this.userService.updatePushToken(req.user.sub, pushToken);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
