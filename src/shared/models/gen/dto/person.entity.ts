import { ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { IntersectionType } from '@nestjs/swagger';
import { User } from './user.entity';
import { JobPosition } from './job-position.entity';
import { Conversation } from './conversation.entity';

export class Person {
  personId: number;
  fullname: string;
  email: string;
  userId: number;
  jobPositionId: number;
}
export class PersonRel {
  @Type(() => User)
  @ValidateNested()
  user: User;
  @Type(() => JobPosition)
  @ValidateNested()
  jobPosition: JobPosition;
  @Type(() => Conversation)
  @ValidateNested()
  @IsOptional()
  conversation: Conversation | null;
}
export class PersonFull extends IntersectionType(Person, PersonRel) {}
