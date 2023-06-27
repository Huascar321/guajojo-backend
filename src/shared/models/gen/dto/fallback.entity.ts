import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IntersectionType } from '@nestjs/swagger';
import { Message } from './message.entity';

export class Fallback {
  fallbackId: number;
  reviewed: boolean;
  messageId: number;
}
export class FallbackRel {
  @Type(() => Message)
  @ValidateNested()
  message: Message;
}
export class FallbackFull extends IntersectionType(Fallback, FallbackRel) {}
