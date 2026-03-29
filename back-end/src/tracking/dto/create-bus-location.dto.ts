import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateBusLocationDto {
  @IsString()
  @IsNotEmpty()
  busId: string;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsNumber()
  @IsOptional()
  speed?: number;

  @IsDateString()
  @IsOptional()
  timestamp?: Date;
}
