import { IntersectionType } from '@nestjs/swagger';

export class Document {
  documentId: number;
  name: string;
}
export class DocumentRel {}
export class DocumentFull extends IntersectionType(Document, DocumentRel) {}
