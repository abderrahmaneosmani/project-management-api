import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import {
  SECRET_REFRESH,
  SECRET_TOKEN,
  TIME_REFRESH,
  TIME_TOKEN,
} from 'src/config-var';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(payload: LoginDto) {
    const { email, password } = payload;
    const user: any = await this.userService.findUserByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async generateAccessTokenRefreshToken(sub: string, username: string) {
    const accessToken = await this.jwtService.signAsync(
      {
        username,
        sub,
      },
      {
        expiresIn: TIME_TOKEN,
        secret: SECRET_TOKEN,
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        username: username,
        sub: sub,
      },
      {
        secret: SECRET_REFRESH,
        expiresIn: TIME_REFRESH,
      },
    );

    return { accessToken, refreshToken };
  }
  async login(user: any) {
    const checkUser: any = await this.userService.findUserByEmail(user.email);

    const { refreshToken, accessToken } =
      await this.generateAccessTokenRefreshToken(
        checkUser._id,
        checkUser.username,
      );
    await this.userService.update(checkUser._id, { refreshToken });

    return { refreshToken, accessToken };
  }
  async logout(userId: string) {
    const user = await this.userService.update(userId, { refreshToken: null });
    return user;
  }

  async refreshToken(id: string, rt: string) {
    const checkUser: any = await this.userService.findOne(id);

    if (!checkUser || !checkUser.refreshToken) {
      throw new ForbiddenException('Cant access');
    }
    const validToken = await this.jwtService.verifyAsync(rt, {
      secret: process.env.SECRET_REFRESH,
    });

    console.log('valid', validToken);
    if (!validToken) {
      throw new ForbiddenException('Cant access');
    }

    const { refreshToken, accessToken } =
      await this.generateAccessTokenRefreshToken(id, checkUser.username);
    await this.userService.update(id, {
      refreshToken: refreshToken,
    });
    return { refreshToken, accessToken };
  }
}
