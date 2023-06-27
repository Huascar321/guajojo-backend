import { IntersectionType } from '@nestjs/swagger';

export class Response {
  responseId: number;
  name: string;
  content: string;
}
export class ResponseRel {}
export class ResponseFull extends IntersectionType(Response, ResponseRel) {}
