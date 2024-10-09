import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [AuthService],

  imports: [UsersModule],
})
export class AuthModule {}
