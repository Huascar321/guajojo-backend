import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IntersectionType } from '@nestjs/swagger';
import { Person } from './person.entity';
import { Department } from './department.entity';

export class JobPosition {
  jobPositionId: number;
  name: string;
  departmentId: number;
}
export class JobPositionRel {
  @Type(() => Person)
  @ValidateNested()
  Persons: Person[];
  @Type(() => Department)
  @ValidateNested()
  department: Department;
}
export class JobPositionFull extends IntersectionType(
  JobPosition,
  JobPositionRel
) {}
