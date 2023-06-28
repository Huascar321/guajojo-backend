import { Observable, map, tap } from 'rxjs';
import { PrismaWithModel } from '../prisma/prisma.model';
import { ClassConstructor } from 'class-transformer';
import { PrismaService } from '../../../core/services/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { lowerCaseFirstLetter } from '../../helpers/case.helper';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { BadRequestException } from '@nestjs/common';

export interface IRepository<T, ConnectDto, CreateDto> {
  findAll(): Observable<T[]>;
  findOne(where: ConnectDto): Observable<T | null>;
  create(data: CreateDto): Observable<T>;
  update(where: ConnectDto, data: CreateDto): Observable<T>;
  delete(where: ConnectDto): Observable<null>;
}

export abstract class Repository<T, ConnectDto, CreateDto>
  implements IRepository<T, ConnectDto, CreateDto>
{
  private db: PrismaWithModel;

  protected constructor(
    private entity: ClassConstructor<unknown>,
    private prismaService: PrismaService
  ) {
    this.getPrismaMetadataInfo();
  }

  findAll(): Observable<T[]> {
    return fromPromise(this.db.findMany());
  }

  findOne(where: ConnectDto): Observable<T | null> {
    return fromPromise(
      this.db.findUnique({
        where
      })
    ).pipe(
      map((item) => {
        if (!item)
          throw new BadRequestException('No record found with this id');
        return item as any;
      })
    );
  }

  create(data: CreateDto): Observable<T> {
    return fromPromise(
      this.db.create({
        data
      })
    );
  }

  update(where: ConnectDto, data: CreateDto): Observable<T> {
    return fromPromise(
      this.db.update({
        where,
        data
      })
    );
  }

  delete(where: ConnectDto): Observable<null> {
    return fromPromise(
      this.db.delete({
        where
      })
    );
  }

  private getPrismaMetadataInfo(): void {
    const entityName = this.entity.name;
    const prismaModelInfo = Prisma.dmmf.datamodel.models.find(
      (model) => model.name === entityName
    );
    if (prismaModelInfo) {
      const modelName = lowerCaseFirstLetter(prismaModelInfo.name);
      this.db = (this.prismaService as any)[modelName];
    }
  }
}
