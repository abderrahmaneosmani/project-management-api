import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/auth.dto';
import { Public } from './decorator/public';
import { Request } from 'express';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @UseGuards(JwtRefreshGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    console.log('req', req.user);
    return this.authService.logout(req.user['sub']);
  }
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId: string = req.user['sub'];

    console.log('us id', userId);

    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshToken(userId, refreshToken);
  }
}
