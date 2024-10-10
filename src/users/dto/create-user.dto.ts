import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

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
  @IsString()
  refreshToken: string;
  @ApiProperty({ description: 'Role code (e.g., admin, user, etc.)' })
  role: string; // Accept role as a code (string) like "admin"
}
