import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IntersectionType } from '@nestjs/swagger';
import { Person } from './person.entity';
import { Message } from './message.entity';

export class Conversation {
  conversationId: number;
  personId: number;
}
export class ConversationRel {
  @Type(() => Person)
  @ValidateNested()
  person: Person;
  @Type(() => Message)
  @ValidateNested()
  messages: Message[];
}
export class ConversationFull extends IntersectionType(
  Conversation,
  ConversationRel
) {}
