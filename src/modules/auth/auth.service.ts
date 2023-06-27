import {
  BadRequestException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { Response } from 'express';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { Jwt } from '../../shared/models/auth/jwt.model';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { ConfigurationToken } from '../../core/config/configuration';
import { parseTimeToSeconds } from '../../shared/helpers/parser.helper';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  signIn(
    username: string,
    password: string,
    res: Response
  ): Observable<Omit<Jwt, 'refresh_token'>> {
    return this.userService.findOne({ username }).pipe(
      switchMap((foundUser) => {
        if (!foundUser) throw new BadRequestException('User not found');
        return fromPromise(bcrypt.compare(password, foundUser.password)).pipe(
          switchMap((isMatch) => {
            if (!isMatch) throw new BadRequestException('Incorrect password');
            return this.generateTokens(username).pipe(
              map((tokens) => {
                this.setRefreshTokenCookie(res, tokens.refresh_token);
                delete (tokens as any).refresh_token;
                return tokens;
              })
            );
          })
        );
      })
    );
  }

  signUp(
    username: string,
    password: string
  ): Observable<Omit<User, 'password'>> {
    return fromPromise(bcrypt.hash(password, 10)).pipe(
      switchMap((hashedPassword) => {
        return this.userService.create({
          username,
          password: hashedPassword
        });
      })
    );
  }

  signOut(res: Response): Observable<null> {
    return this.removeRefreshTokenCookie(res);
  }

  refresh(refreshToken: string): Observable<Omit<Jwt, 'refresh_token'>> {
    return fromPromise(this.jwtService.verifyAsync(refreshToken)).pipe(
      switchMap((payload) => {
        return this.userService.findOne({ username: payload.username }).pipe(
          switchMap((foundUser) => {
            if (!foundUser) throw new BadRequestException('User not found');
            return fromPromise(
              this.jwtService.signAsync({ username: foundUser.username })
            ).pipe(
              map((accessToken) => ({
                access_token: accessToken
              }))
            );
          })
        );
      }),
      map((payload) => {
        return {
          access_token: payload.access_token,
          access_token_expires_in:
            this.configService.get<string>(
              ConfigurationToken.AccessTokenTime
            ) || '30m'
        };
      })
    );
  }

  setRefreshTokenCookie(res: Response, refreshToken: string): void {
    const refreshTokenTime = this.configService.get<string>(
      ConfigurationToken.RefreshTokenTime
    );
    if (!refreshTokenTime)
      throw new InternalServerErrorException('Refresh token time not defined');
    res.cookie('RefreshToken', refreshToken, {
      httpOnly: true,
      maxAge: parseTimeToSeconds(refreshTokenTime) * 1000,
      sameSite: 'strict'
    });
  }

  removeRefreshTokenCookie(res: Response): Observable<null> {
    res.clearCookie('RefreshToken', {
      httpOnly: true,
      sameSite: 'strict'
    });
    return of(null);
  }

  private generateTokens(username: string) {
    return forkJoin([
      fromPromise(this.jwtService.signAsync({ username })),
      fromPromise(
        this.jwtService.signAsync(
          { username, tokenId: uuid() },
          {
            expiresIn: this.configService.get<string>(
              ConfigurationToken.RefreshTokenTime
            )
          }
        )
      )
    ]).pipe(
      map(([accessToken, refreshToken]) => ({
        access_token: accessToken,
        refresh_token: refreshToken,
        access_token_expires_in:
          this.configService.get<string>(ConfigurationToken.AccessTokenTime) ||
          '30m'
      }))
    );
  }
}
