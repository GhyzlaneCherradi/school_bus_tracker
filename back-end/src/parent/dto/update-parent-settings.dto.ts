import { IsBoolean, IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class UpdateParentSettingsDto {
  @IsOptional()
  @IsBoolean()
  notificationsEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  vibrationEnabled?: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
  delayThresholdMinutes?: number;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsUUID()
  selectedChildId?: string;
}
