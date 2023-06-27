import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { AuthService } from '../../modules/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigurationToken } from '../config/configuration';
import { lastValueFrom } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Response, Request } from 'express';
import { Jwt } from '../../shared/models/auth/jwt.model';
import {
  extractAccessTokenFromHeader,
  extractRefreshTokenFromCookie
} from '../../shared/helpers/extractor.helper';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly jwtSecret: string;

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private jwtService: JwtService,
    private reflector: Reflector
  ) {
    this.jwtSecret =
      this.configService.get<string>(ConfigurationToken.JwtSecret) ?? 'secret';
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.isPublic(context)) return true;
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest();
    const accessToken =
      extractAccessTokenFromHeader(request) ?? 'Token not found';
    const refreshToken = extractRefreshTokenFromCookie(request);
    if (!refreshToken) throw new UnauthorizedException();

    return this.handleActivation({
      response,
      request,
      accessToken,
      refreshToken
    });
  }

  private async handleActivation(args: {
    response: Response;
    request: Request;
    accessToken: string;
    refreshToken: string;
  }): Promise<boolean> {
    try {
      (args.request as any)['user'] = await this.jwtService.verifyAsync(
        args.accessToken,
        {
          secret: this.jwtSecret
        }
      );
      args.response.set('Cache-Control', 'no-store');
      return true;
    } catch (error) {
      if (
        error.name === 'TokenExpiredError' ||
        error.name === 'JsonWebTokenError'
      ) {
        const refreshTokenPayload = await this.jwtService.verifyAsync(
          args.refreshToken
        );
        if (!refreshTokenPayload) throw new UnauthorizedException();
        const newAccessToken = await lastValueFrom(
          this.authService.refresh(args.refreshToken)
        );
        this.setNewTokensToResponse(args.response, newAccessToken);
        (args.request as any)['user'] = await this.jwtService.verifyAsync(
          newAccessToken.access_token,
          { secret: this.jwtSecret }
        );
        return true;
      } else {
        throw new UnauthorizedException();
      }
    }
  }

  private isPublic(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
  }

  private setNewTokensToResponse(
    response: Response,
    tokenInfo: Omit<Jwt, 'refresh_token'>
  ): void {
    response.setHeader('New-Token', JSON.stringify(tokenInfo));
    response.set('Cache-Control', 'no-store');
  }
}
