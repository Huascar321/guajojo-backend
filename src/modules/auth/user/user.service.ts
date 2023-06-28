import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/services/prisma/prisma.service';
import { Observable } from 'rxjs';
import { Prisma, User } from '@prisma/client';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

@Injectable()
export class UserService {
  constructor(private db: PrismaService) {}

  findOne(whereInput: Prisma.UserWhereUniqueInput): Observable<User | null> {
    return fromPromise(
      this.db.user.findUnique({
        where: whereInput
      })
    );
  }

  create(data: Prisma.UserCreateInput): Observable<Omit<User, 'password'>> {
    return fromPromise(
      this.db.user.create({
        data,
        select: {
          userId: true,
          username: true
        }
      })
    ) as Observable<Omit<User, 'password'>>;
  }
}
