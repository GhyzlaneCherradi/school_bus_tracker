import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ParentService } from './parent.service';
import { UpdateParentSettingsDto } from './dto/update-parent-settings.dto';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @Get('parent/profile')
  async getProfile(@Req() req: any) {
    return this.parentService.getProfile(req.user.sub);
  }

  @Get('parent/children')
  async getChildren(@Req() req: any) {
    return this.parentService.getChildren(req.user.sub);
  }

  @Get('alerts')
  async getAlerts(@Req() req: any) {
    return this.parentService.getAlerts(req.user.sub);
  }

  @Get('parent/settings')
  async getSettings(@Req() req: any) {
    return this.parentService.getSettings(req.user.sub);
  }

  @Patch('parent/settings')
  async updateSettings(@Req() req: any, @Body() dto: UpdateParentSettingsDto) {
    return this.parentService.updateSettings(req.user.sub, dto);
  }
}
