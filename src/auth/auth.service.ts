import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async login(payload: LoginDto) {
    const { email, password } = payload;
    const user: any = await this.userService.findUserByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
