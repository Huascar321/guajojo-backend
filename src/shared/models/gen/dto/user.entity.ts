import { IntersectionType } from '@nestjs/swagger';

export class User {
  userId: number;
  username: string;
  password: string;
}
export class UserRel {}
export class UserFull extends IntersectionType(User, UserRel) {}
