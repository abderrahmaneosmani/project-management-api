import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  refreshToken: string;
  @ApiProperty({ description: 'Role code (e.g., admin, user, etc.)' })
  role: string; // Accept role as a code (string) like "admin"
}
