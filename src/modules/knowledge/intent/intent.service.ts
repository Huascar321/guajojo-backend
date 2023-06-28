import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/services/prisma/prisma.service';
import { Repository } from '../../../shared/models/abstracts/repository.model';
import {
  ConnectIntentDto,
  CreateIntentDto,
  Intent
} from '../../../shared/models/gen';

@Injectable()
export class IntentService extends Repository<
  Intent,
  ConnectIntentDto,
  CreateIntentDto
> {
  constructor(db: PrismaService) {
    super(Intent, db);
  }
}
