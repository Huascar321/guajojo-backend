import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, {
  ConfigurationToken
} from '../../core/config/configuration';
import { JwtModule } from '@nestjs/jwt';

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
  ]
})
export class AuthModule {}
