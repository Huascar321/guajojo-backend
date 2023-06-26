import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    })
  ],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class CoreModule {}
