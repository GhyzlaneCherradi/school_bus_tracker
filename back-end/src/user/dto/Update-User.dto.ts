import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './Create-User.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) { }
