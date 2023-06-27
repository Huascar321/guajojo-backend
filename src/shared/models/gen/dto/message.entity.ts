import { ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Prisma, Role } from '@prisma/client';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Fallback } from './fallback.entity';
import { Conversation } from './conversation.entity';

export class Message {
  messageId: number;
  @ApiProperty({ enum: Role })
  role: Role;
  text: string;
  intent: string;
  entities: Prisma.JsonValue;
  timestamp: string;
  payload: Prisma.JsonValue;
  conversationId: number;
}
export class MessageRel {
  @Type(() => Conversation)
  @ValidateNested()
  conversation: Conversation;
  @Type(() => Fallback)
  @ValidateNested()
  @IsOptional()
  fallback: Fallback | null;
}
export class MessageFull extends IntersectionType(Message, MessageRel) {}
