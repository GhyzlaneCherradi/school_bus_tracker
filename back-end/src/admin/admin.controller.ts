import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../user/Entities/user.entity';
import { CreateChildAdminDto } from './dto/create-child-admin.dto';
import { CreateAlertAdminDto } from './dto/create-alert-admin.dto';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('children')
  createChild(@Body() dto: CreateChildAdminDto) {
    return this.adminService.createChild(dto);
  }

  @Post('alerts')
  createAlert(@Body() dto: CreateAlertAdminDto) {
    return this.adminService.createAlert(dto);
  }
}
