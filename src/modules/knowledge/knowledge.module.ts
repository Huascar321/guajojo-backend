import { Module } from '@nestjs/common';
import { IntentController } from './intent/intent.controller';
import { IntentService } from './intent/intent.service';
import { EntityController } from './entity/entity.controller';
import { EntityService } from './entity/entity.service';
import { ResponseController } from './response/response.controller';
import { ResponseService } from './response/response.service';
import { StoryController } from './story/story.controller';
import { StoryService } from './story/story.service';
import { DocumentController } from './document/document.controller';
import { DocumentService } from './document/document.service';

@Module({
  controllers: [IntentController, EntityController, ResponseController, StoryController, DocumentController],
  providers: [IntentService, EntityService, ResponseService, StoryService, DocumentService]
})
export class KnowledgeModule {}
