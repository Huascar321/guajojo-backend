export default () => ({
  accessTokenTime: process.env.ACCESS_TOKEN_TIME,
  refreshTokenTime: process.env.REFRESH_TOKEN_TIME,
  frontendUrl: process.env.FRONTEND_URL,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET
});
