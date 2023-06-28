import { Injectable } from '@nestjs/common';
import { Repository } from '../../../shared/models/abstracts/repository.model';
import {
  ConnectEntityDto,
  CreateEntityDto,
  Entity
} from '../../../shared/models/gen';
import { PrismaService } from '../../../core/services/prisma/prisma.service';

@Injectable()
export class EntityService extends Repository<
  Entity,
  ConnectEntityDto,
  CreateEntityDto
> {
  constructor(db: PrismaService) {
    super(Entity, db);
  }
}
