import { Injectable } from '@nestjs/common';
import { Repository } from '../../../shared/models/abstracts/repository.model';
import {
  ConnectResponseDto,
  CreateResponseDto,
  Response
} from '../../../shared/models/gen';
import { PrismaService } from '../../../core/services/prisma/prisma.service';

@Injectable()
export class ResponseService extends Repository<
  Response,
  ConnectResponseDto,
  CreateResponseDto
> {
  constructor(db: PrismaService) {
    super(Response, db);
  }
}
