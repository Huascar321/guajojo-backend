import { IntersectionType } from '@nestjs/swagger';

export class Entity {
  entityId: number;
  name: string;
  color: string;
  memory: boolean;
}
export class EntityRel {}
export class EntityFull extends IntersectionType(Entity, EntityRel) {}
