import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  username: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
  @IsOptional()
  @IsString()
  refreshToken: string;
  @ApiProperty()
  role: string;
}
