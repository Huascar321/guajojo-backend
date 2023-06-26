import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { ConfigurationToken } from './core/config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>(ConfigurationToken.Port, 3000);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Guajojo API')
    .setDescription('API documentation about the project')
    .setVersion('2.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  app.use(cookieParser());
  const frontendUrl = configService.get<string>(ConfigurationToken.FrontendUrl);
  if (frontendUrl) {
    app.enableCors({
      origin: [frontendUrl],
      credentials: true,
      exposedHeaders: ['New-Token']
    });
  }
  app.use(helmet());
  await app.listen(port);
}
bootstrap();
