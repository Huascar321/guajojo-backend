import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { Jwt } from '../../shared/models/auth/jwt.model';
import { Observable } from 'rxjs';
import { Response, Request } from 'express';
import { Public } from '../../core/decorators/public.decorator';
import { extractRefreshTokenFromCookie } from '../../shared/helpers/extractor.helper';
import { UserProfile } from '../../shared/models/user/user-profile.model';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(
    @Body() signInDto: Omit<User, 'userId'>,
    @Res({ passthrough: true }) res: Response
  ): Observable<Omit<Jwt, 'refresh_token'>> {
    return this.authService.signIn(signInDto.username, signInDto.password, res);
  }

  @ApiBearerAuth()
  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('logout')
  signOut(@Res({ passthrough: true }) res: Response): Observable<null> {
    return this.authService.signOut(res);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('register')
  signUp(
    @Body() signUpDto: Omit<User, 'userId'>
  ): Observable<Omit<User, 'password'>> {
    return this.authService.signUp(signUpDto.username, signUpDto.password);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  refresh(@Req() req: Request): Observable<Omit<Jwt, 'refresh_token'>> {
    const refreshToken = extractRefreshTokenFromCookie(req);
    if (refreshToken) return this.authService.refresh(refreshToken);
    throw new BadRequestException(`There's no refresh token in cookies`);
  }

  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Req() req: Request): UserProfile {
    return (req as any).user;
  }
}
