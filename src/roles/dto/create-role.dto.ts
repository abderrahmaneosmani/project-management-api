import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @ApiProperty()
  name: string;
  @IsString()
  @ApiProperty()
  code: string;
}
