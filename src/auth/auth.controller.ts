import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/auth.dto';
import { Public } from './decorator/public';
import { Request } from 'express';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@ApiBearerAuth('JWT-auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Req() req) {
    const res = this.authService.logout(req.user['sub']);
    if (res) {
      req.user = undefined;
    }
  }
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId: string = req.user['sub'];

    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshToken(userId, refreshToken);
  }
}
