import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateChildAdminDto {
  @IsUUID()
  @IsNotEmpty()
  parentId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  level?: string;

  @IsOptional()
  @IsString()
  school?: string;

  @IsOptional()
  @IsString()
  busId?: string;

  @IsOptional()
  @IsString()
  driverName?: string;

  @IsOptional()
  @IsString()
  driverPhone?: string;

  @IsOptional()
  @IsString()
  pickupTime?: string;
}
