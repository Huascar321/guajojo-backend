import { Injectable } from '@nestjs/common';
import { Repository } from '../../../shared/models/abstracts/repository.model';
import {
  ConnectDocumentDto,
  CreateDocumentDto,
  Document
} from '../../../shared/models/gen';
import { PrismaService } from '../../../core/services/prisma/prisma.service';

@Injectable()
export class DocumentService extends Repository<
  Document,
  ConnectDocumentDto,
  CreateDocumentDto
> {
  constructor(db: PrismaService) {
    super(Document, db);
  }
}
