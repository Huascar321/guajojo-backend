import { Module } from '@nestjs/common';
import { IntentController } from './intent/intent.controller';
import { IntentService } from './intent/intent.service';

@Module({
  controllers: [IntentController],
  providers: [IntentService]
})
export class KnowledgeModule {}
