import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IntersectionType } from '@nestjs/swagger';
import { JobPosition } from './job-position.entity';

export class Department {
  departmentId: number;
  name: string;
}
export class DepartmentRel {
  @Type(() => JobPosition)
  @ValidateNested()
  jobPositions: JobPosition[];
}
export class DepartmentFull extends IntersectionType(
  Department,
  DepartmentRel
) {}
