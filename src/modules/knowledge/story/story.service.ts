import { Injectable } from '@nestjs/common';
import { Repository } from '../../../shared/models/abstracts/repository.model';
import {
  ConnectStoryDto,
  CreateStoryDto,
  Story
} from '../../../shared/models/gen';
import { PrismaService } from '../../../core/services/prisma/prisma.service';

@Injectable()
export class StoryService extends Repository<
  Story,
  ConnectStoryDto,
  CreateStoryDto
> {
  constructor(db: PrismaService) {
    super(Story, db);
  }
}
