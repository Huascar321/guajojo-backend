import { ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { IntersectionType } from '@nestjs/swagger';
import { Person } from './person.entity';

export class User {
  userId: number;
  username: string;
  password: string;
}
export class UserRel {
  @Type(() => Person)
  @ValidateNested()
  @IsOptional()
  person: Person | null;
}
export class UserFull extends IntersectionType(User, UserRel) {}
