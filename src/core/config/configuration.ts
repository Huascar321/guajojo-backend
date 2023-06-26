import { getEnvironmentVariable } from '../../shared/helpers/environment.helper';

export enum ConfigurationToken {
  AccessTokenTime = 'accessTokenTime',
  RefreshTokenTime = 'refreshTokenTime',
  FrontendUrl = 'frontendUrl',
  Port = 'port',
  JwtSecret = 'jwtSecret'
}

export default () => ({
  accessTokenTime: getEnvironmentVariable('ACCESS_TOKEN_TIME'),
  refreshTokenTime: getEnvironmentVariable('REFRESH_TOKEN_TIME'),
  frontendUrl: getEnvironmentVariable('FRONTEND_URL'),
  port: getEnvironmentVariable('PORT'),
  jwtSecret: getEnvironmentVariable('JWT_SECRET')
});
