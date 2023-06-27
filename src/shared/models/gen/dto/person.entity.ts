import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IntersectionType } from '@nestjs/swagger';
import { User } from './user.entity';
import { JobPosition } from './job-position.entity';

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
}
export class PersonFull extends IntersectionType(Person, PersonRel) {}
