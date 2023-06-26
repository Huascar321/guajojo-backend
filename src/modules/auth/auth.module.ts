import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, {
  ConfigurationToken
} from '../../core/config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(ConfigurationToken.JwtSecret),
        signOptions: {
          expiresIn: configService.get(ConfigurationToken.AccessTokenTime)
        }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService],
  exports: [AuthService]
})
export class AuthModule {}
